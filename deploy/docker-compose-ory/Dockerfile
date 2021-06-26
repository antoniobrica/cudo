FROM oryd/kratos:v0.5.5-alpha.1
#COPY .kratos-config/identity.schema.json /home/ory
#COPY .kratos-config/kratos.yml /home/ory/.kratos.yml
#RUN ls -ld /home/ory/.kratos.yml
#RUN kratos --config  /home/ory/.kratos.yml migrate sql -e --yes
COPY sh.sh /home/ory
#RUN kratos --config  /etc/config/kratos.yml migrate sql -e --yes
COPY .kratos-config/identity.schema.json /etc/config/
COPY .kratos-config/kratos.yml /etc/config/kratos.yaml
RUN kratos --config  /etc/config/kratos.yaml migrate sql -e --yes
ENV DSN=mysql://cudo:Welcome@1@tcp(112.196.20.249:3306)/cudo-dev?max_conns=20&max_idle_conns=4
ENV LOG_LEVEL=trace

#ENTRYPOINT ["kratos"]
#CMD ["serve"]
ENTRYPOINT ["./home/ory/sh.sh"]

