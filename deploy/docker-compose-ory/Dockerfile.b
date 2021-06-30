FROM oryd/kratos:latest-sqlite
RUN echo $HOME
CMD ["/bin/sh"]
COPY .kratos-config/identity.schema.json /home/ory/ 
COPY .kratos-config/kratos.yml /home/ory/.kratos.yml
#COPY .kratos-config/identity.schema.json /etc/config/kratos/ 
#COPY .kratos-config/kratos.yml /etc/config/kratos/
#RUN kratos --config  /home/ory/.kratos.yml migrate sql -e --yes
ENV DSN=mysql://cudo:Welcome@1@tcp(112.196.20.249:3306)/cudo?max_conns=20&max_idle_conns=4
ENV LOG_LEVEL=trace
#RUN ls -ld /etc/config/kratos/*
ENTRYPOINT ["kratos"]
CMD ["serve"]
#"-c" "/etc/config/kratos/kratos.yml"]

