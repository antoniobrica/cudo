1. Create a docker compose file
Create a docker compose file such as docker-compose-sql.yml in your editor of choice. As I'm using Linux, I'll be using nano.

nano /home/deploy/docker-compose-sql.yml
2. Specify the SQL Docker image and a volume
Create a docker compose file as shown below:

version: '3'

services:

  sqlserver2017:
    image: mcr.microsoft.com/mssql/server:2017-latest
    container_name: sql2017
    ports:
        - "8383:1433"
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=Welcome@1
      - MSSQL_PID=Developer
    volumes:
      - sqlserver-data:/var/opt/mssql
    logging:
      options:
        max-size: "10m"
        max-file: "10" 
        
volumes:
  sqlserver-data:
Be sure to change the password Welcome@1 for a strong password with at least 8 characters, as SQL server has some specific password policies in place. If you're struggling with a generating a password, you can use 1Password's password generator or Lastpass's password generator.

Notice that I have specified a volume called sqlserver-data. This is mapped to the folder /var/opt/mssql within the SQL docker image. This means that these files are mapped to the host so that if the docker container is restarted, stopped or the machine is rebooted, when it is resumed, the database and data are not lost.

I have also changed the host port to 8383, rather than keeping the default 1433 to make things more explicit and also not to interfere with any other SQL server instances that may have that default port.

To save the changes to the file, hit Ctrl+X and Y when prompted to save changes.

3. Start the Docker container

docker-compose -f .\deploy\docker-compose-sql\docker-compose-sql.yml up -d
This may take a few minutes depending on the internet connection. Also, it has to pull the Sql Server 2017 image from Docker Hub which is about 1.5GB.

4. Confirm its running
Once complete, you can confirm that the container is running by running docker ps

root@sql01:/home/deploy# docker ps
CONTAINER ID        IMAGE                                        COMMAND                  CREATED             STATUS              PORTS                    NAMES
df2561f10b5c        mcr.microsoft.com/mssql/server:2017-latest   "/opt/mssql/bin/sqls…"   15 minutes ago      Up 2 seconds        0.0.0.0:1433->1433/tcp   sql2017
N.B If there are any issues, you can run docker logs sql2017 to diagnose any issues.

Confirm SQL Server is running
To verify SQL Server is actually running we can connect to the docker container directly.
1. Run Docker interactive mode

docker exec -it sql2017 "bash"
Where sql2017 is the name of the container.

2. Connect to SQL Server
Once connected, we can run the sqlcmd tool to connect to the instance.

/opt/mssql-tools/bin/sqlcmd -S 192.168.43.138 -U sa -P 'Welcome@1'
N.B 'Welcome@1' is the password that was set in the docker compose file earlier.
You should see a 1> prompt once succesfully connected. Here's the full output from the above steps:

root@sql01:/home/deploy# docker exec -it sql2017 "bash"
root@df2561f10b5c:/# /opt/mssql-tools/bin/sqlcmd -S 192.168.43.138 -U sa -P 'Welcome@1'
1>
3. Execute a SQL query
Now type SELECT Name from sys.Databases and hit enter.
Now type GO and hit enter. You should now get something like this:

1> SELECT Name from sys.Databases
2> go
Name
--------------------------------------------------------------------------------------------------------------------------------
master
tempdb
model
msdb

(4 rows affected)
1>
4. Exit
Now type exit to exit sqlcmd and exit again to exit bash.
Great, now we have a fully operational SQL Server instance in docker!


Connect to SQL Server from outside of the container
Now that SQL server is up and running, it would be useful if we can actually connect to it from outside of the Docker container.
Since I'm using DigitalOcean, it will just simply be the public ip address that was assigned to the droplet and the port that was specified in the docker compose file. I can either connect using SQL Server Management Studio, or Azure Data Studio which is cross platform.

If, however, you are running this locally on either Windows or Mac, we need to obtain the ip address. Generally, 192.168.43.138 will work fine, however when I was testing on windows, I had to run ipconfig on windows.

https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-2017

## To clear sql db setup
docker-compose -f .\deploy\docker-compose-sql\docker-compose-sql.yml down
