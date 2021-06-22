FROM oryd/kratos:v0.5.5-alpha.1
RUN echo $HOME
CMD ["/bin/sh"]
COPY .kratos-config/identity.schema.json /home/ory/
COPY .kratos-config/kratos.yml /home/ory/.kratos.yml
RUN kratos --config  /home/ory/.kratos.yml migrate sql -e --yes
ENTRYPOINT ["kratos"]
CMD ["serve"]

