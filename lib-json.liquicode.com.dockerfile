FROM		ubuntu:18.04
LABEL		name="lib-json.liquicode.com"
LABEL		description="lib-json.liquicode.com"

# Install dependencies
RUN apt-get update && \
 apt-get -y install apache2

# Copy source files
COPY		./docs		/var/www/html

# Configure apache
RUN echo '. /etc/apache2/envvars' > /root/run_apache.sh && \
 echo 'mkdir -p /var/run/apache2' >> /root/run_apache.sh && \
 echo 'mkdir -p /var/lock/apache2' >> /root/run_apache.sh && \ 
 echo '/usr/sbin/apache2 -D FOREGROUND' >> /root/run_apache.sh && \ 
 chmod 755 /root/run_apache.sh

EXPOSE 80

CMD /root/run_apache.sh
