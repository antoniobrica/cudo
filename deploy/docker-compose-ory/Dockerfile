FROM oryd/kratos:v0.5.5-alpha.1
COPY .kratos-config/identity.schema.json /home/ory
COPY .kratos-config/kratos.yml /home/ory/.kratos.yml
RUN kratos --config  /home/ory/.kratos.yml migrate sql -e --yes
#RUN kratos --config  /etc/config/kratos.yml migrate sql -e --yes
#COPY .kratos-config/identity.schema.json /etc/config/
#COPY .kratos-config/kratos.yml /etc/config/
#RUN kratos --config  /etc/config/kratos.yml migrate sql -e --yes
ENTRYPOINT ["kratos"]
CMD ["serve"]

