import React from 'react';
import { Input, Form, Dropdown, Icon } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { GET_BKP_HIERARCHIES, GET_STRUCTURE } from '../../graphql/graphql';
import { useLocation } from 'react-router-dom';
import { useStructureQuery } from '../../services/useRequest';
import House from './house';
import { LazyLoading, ModalCost } from '@cudo/shared-components';
import { useTranslation } from 'react-i18next';
/* eslint-disable-next-line */
export interface BkpHierarchyProps {
  // addNew?,
  // costs?,
  // delete?
  // updateBkpCost?
}


export function BkpHierarchy(props: BkpHierarchyProps) {
  const [openAddCost, setOpenAddCost] = React.useState(false)
  const [openEditCost, setOpenEditCost] = React.useState(false)
  const [estimateCost, setEstimateCost] = React.useState('5,000.00')
  const [gstRate, setgstRate] = React.useState(10)
  const [subTotal, setSubTotal] = React.useState(0)
  const [gstCost, setGstCost] = React.useState(0)
  const [total, setTotal] = React.useState(0)
  const { t } = useTranslation()

  const location = useLocation()
  const referenceID = location?.pathname?.split('/')[3]
  // load bkp hierarchies 
  const { loading, error, data } = useQuery(GET_BKP_HIERARCHIES, {
    variables: { referenceID, referenceType: "COMPANY" } // ref type is project but need to keep company because getting data from DB only for company ref
  })

  // load house data
  const { loading: structureLoading, error: structureError, data: structureData } = useStructureQuery(GET_STRUCTURE);


  // get sub total
  React.useEffect(() => {
    let subTotalPrice = 0
    data?.getBkps?.forEach(item => {
      item?.children?.forEach(levelTwoItem => {
        levelTwoItem?.bkpChildrenLayerTwo?.forEach(levelThreeItem => {
          subTotalPrice += levelThreeItem.itemTotalPrice
        })
      })
    })
    const gstPrice = subTotalPrice * gstRate / 100
    setSubTotal(subTotalPrice)
    setGstCost(gstPrice)
    setTotal(subTotalPrice + gstPrice)

  }, [data])

  // toggle open-close edit estimated cost 
  const editCost = () => {
    setOpenEditCost(!openEditCost);
  }

  // on change set estimated cost value
  const onChangeEstimateCost = (e) => {
    setEstimateCost(e.target.value)
  }

  const handelAddNewCost = () => {
    setOpenAddCost(true)
  }

  // const createCost = (items, hs) => {
  //   console.log('house------------>', hs)
  //   console.log('items------------>', items)
  //   const selectedItems = items?.map(item => {
  //     return { ...item, itemQuantity: +item.itemQuantity, itemPrice: +item.itemPrice, itemTotalPrice: item.itemPrice * item.itemQuantity }
  //   })
  //   const addLayerTwoBkpHierarchy = { structureID: hs.structureID, childrenLayerTwo: selectedItems }

  //   const variables = {
  //     referenceID,
  //     referenceType: "COMPANY",
  //     addLayerTwoBkpHierarchy
  //   }

  //   addBkpCosts({
  //     variables
  //   })
  // }

  const cancel = () => {
    setOpenAddCost(false)
  }

  if (loading) return <LazyLoading />

  return (
    <div className="tabs-main-info-container">
      {
        openAddCost && <ModalCost house={null} openCost={openAddCost} cancel={cancel} bkpCostFilter={""} />
      }

      <div className="main-content-con cost-management-con">

        {/* top header */}
        <div className="heading-con">
          <h3 className="alltask">{t("project_tab_menu.cost.cost_management")} <span>{t("project_tab_menu.cost.manage_cost_for")} Electrical Work</span></h3>
          <span className="action-dropdown">
            <Dropdown text='...' pointing="right">
              <Dropdown.Menu>
                <Dropdown.Item icon='print' text='Print' />
                <Dropdown.Item icon='download' text='Download' />
              </Dropdown.Menu>
            </Dropdown>
          </span>
        </div>

        {/* total estimated cost bar */}
        <div className="eastimated-cost-con">
          <h3><Icon name="currency" /> {t("project_tab_menu.cost.estimated_cost")}</h3>
          <div className="estimated-price-box">
            {openEditCost == false ?
              <div className="estimated-price-total">
                ${estimateCost}

                <Icon onClick={editCost} className="edit" />
              </div>
              :
              <div className="edit-estimated-price" >
                <Form.Field className="fillarea">
                  <Input
                    placeholder='Enter your text here....'
                    size='small' className="full-width "
                    type="text"
                    value={estimateCost}
                    onChange={onChangeEstimateCost}
                  />
                </Form.Field>
                <Form.Field className="d-flex">
                  <button className="greenbutton anchor_complete" onClick={editCost}>
                    <i className="ms-Icon ms-Icon--CheckMark" aria-hidden="true"></i>
                  </button> &nbsp;  <button className="redbutton anchor_complete" onClick={editCost}>
                    <i className="ms-Icon ms-Icon--ChromeClose" aria-hidden="true"></i>
                  </button>
                </Form.Field>
              </div>
            }
          </div>
        </div>

        {/* bkp costs tree view */}
        <div className="treeview-main-con">
          {/* add new cost button */}
          <h4 className="d-flex justify-space-between">{t("project_tab_menu.cost.items")}
            <div className="add-new-block">
              <div className="add-new-link" onClick={handelAddNewCost}>
                <span><Icon name="plus"></Icon> {t("common.add_new_button")}</span>
              </div>
            </div>
          </h4>

          {/* bkp layers */}
          <div className="treeview-inner-con">
            <ul>
              {/* house name layer */}
              {
                structureData?.structureRoots?.map(house => (
                  data?.getBkps?.filter(bkp => bkp.structureID === house.structureID).length > 0
                  && <House key={house.structureID} house={house} bkpData={data} />
                ))
              }

            </ul>
          </div>

          <div className="total-price-gst">
            <div className="add-new-item-btn">
              {/* <button className="ui small button"><i className="ms-Icon ms-Icon--AddTo" aria-hidden="true"></i> Add new</button> */}
            </div>

            <div className="sub-total-item">
              <p>{t("project_tab_menu.cost.sub_total")} <span>${subTotal}</span></p>
              <p>GST {gstRate}% <span>${gstCost}</span></p>
              <p>{t("project_tab_menu.cost.total")} <span>${total}</span></p>
            </div>
          </div>

          <div className="add-files-area">
            <h3>{t("project_tab_menu.cost.add_files")}</h3>
            <Form.Field>
              <div className="dashed_area">
                <div className="file-upload-message">
                  {/* <Image src={img} className="mr-10 " /> */}
                  <p className="file-upload-default-message">{t("project_tab_menu.cost.drag_and_drop")}</p>

                </div>
                <Input type="file" className="file-upload-input" />
              </div>

            </Form.Field>
          </div>

        </div>

      </div>
    </div>
  )
}

export default BkpHierarchy;
