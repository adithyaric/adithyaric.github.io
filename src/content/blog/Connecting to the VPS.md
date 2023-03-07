---
title: "Connecting to the VPS"
description: "Steps to deploy a Node.js app to DigitalOcean using PM2, NGINX as a reverse proxy and an SSL from LetsEncrypt"
pubDate: "Mar 07 2023"
heroImage: "/cloud.png"
---

To connect your VPS server, you can use your server IP, you can create a root password and enter the server with your IP address and password credentials. But the more secure way is using an SSH key.

## Creating SSH Key

### For MAC OS / Linux / Windows 10 (with openssh)

1. Launch the Terminal app.
2. ```ssh-keygen -t rsa```
3. Press ```ENTER``` to store the key in the default folder /Users/lamadev/.ssh/id_rsa).
4. Type a passphrase (characters will not appear in the terminal).
5. Confirm your passphrase to finish SSH Keygen. You should get an output that looks something like this:

``` Your identification has been saved in /Users/lamadev/.ssh/id_rsa.
Your public key has been saved in /Users/lamadev/.ssh/id_rsa.pub.
The key fingerprint is:
ae:89:72:0b:85:da:5a:f4:7c:1f:c2:43:fd:c6:44:30 lamadev@mac.local
The key's randomart image is:
+--[ RSA 2048]----+
|                 |
|         .       |
|        E .      |
|   .   . o       |
|  o . . S .      |
| + + o . +       |
|. + o = o +      |
| o...o * o       |
|.  oo.o .        |
+-----------------+
```

6. Copy your public SSH Key to your clipboard using the following code:

```bash
cat ~/.ssh/id_rsa.pub
```

### For Windows

1. Download PuTTY and PuTTYgen.
2. Open up PuTTYgen and click the ```Generate```.
3. Copy your key.
4. Enter a key passphrase and confirm.
5. Save the private key.

## Connection

After copying the SSH Key go the to hosting service provider dashboard and paste your key and save. After,

***For MAC OS / Linux***

```bash
ssh root@<server ip address>
```

***For Windows***

1. Open the PuTTY app.
2. Enter your IP address.
3. Open the following section: Connection - SSH - Auth
4. Browse the folders and choose your private key.

## First Configuration

### Deleting apache server

```bash
systemctl stop apache2
```

```bash
systemctl disable apache2
```

```bash
apt remove apache2
```

to delete related dependencies:

```bash
apt autoremove
```

### Cleaning and updating server

```bash
apt clean all && sudo apt update && sudo apt dist-upgrade
```

```bash
rm -rf /var/www/html
```

### Installing Nginx

```bash
apt install nginx
```

### Installing and configure Firewall

```bash
apt install ufw
```

```bash
ufw enable
```

```bash
ufw allow "Nginx Full"
```

## First Page

### Delete the default server configuration

```bash
 rm /etc/nginx/sites-available/default
```

```bash
 rm /etc/nginx/sites-enabled/default
```

### First configuration

```bash
 nano /etc/nginx/sites-available/netflix
```

```nginx
server {
  listen 80;

  location / {
        root /var/www/netflix;
        index  index.html index.htm;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        try_files $uri $uri/ /index.html;
  }
}
```

```bash
ln -s /etc/nginx/sites-available/netflix /etc/nginx/sites-enabled/netflix

```

#### Write your fist message

```bash
nano /var/www/netflix/index.html

```

#### Start Nginx and check the page

```bash
systemctl start nginx
```

## Uploading Apps Using Git

```bash
mkdir netflix
```

```bash
cd netflix
```

```bash
git clone <your repository>
```

## Nginx Configuration for new apps

```bash
nano /etc/nginx/sites-available/netflix
```

```nginx
location /api {
        proxy_pass http://45.90.108.107:8800;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
  }
```

> If you check the location /api you are going to get "502" error which is good. Our configuration works. The only thing we need to is running our app

```bash
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

#Reload the shell configuration
source ~/.bashrc
```

```bash
# check if installed
nvm --version
==> 0.33.11
# list available Node.js versions
nvm ls-remote
# choose one version and install it
# example of v10.4.1 installation
nvm install v10.4.1
# check if installed properly
node --version
==> v10.4.1
```

```bash
cd api
```

```bash
npm i
```

```bash
#Copy and paste your env file
cp .env.example .env
```

```bash
node index.js
```

> But if you close your ssh session here. It's gonna kill this process. To prevent this we are going to need a package which is called ```pm2```

```bash
npm i -g pm2

pm2 start app (or whatever your file name)
# Other pm2 commands
pm2 show app
pm2 status
pm2 restart app
pm2 stop app
pm2 logs (Show log stream)
pm2 flush (Clear logs)
```

Let's create a new pm2 instance

```bash
pm2 start --name api index.js
```

```bash
pm2 startup ubuntu
```

## React App Deployment

```bash
cd ../client
```

```bash
#Copy and paste your env file
cp .env.example .env
```

```bash
npm i
```

Let's create the build file

```bash
npm run build
```

Right now, we should move this build file into the main web file

```bash
rm -rf /var/www/netflix/*
```

```bash
mkdir /var/www/netflix/client
```

```bash
cp -r build/* /var/www/netflix/client
```

Let's make some server configuration

```nginx
 location / {
        root /var/www/netflix/client/;
        index  index.html index.htm;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        try_files $uri $uri/ /index.html;
  }

```

### Adding Domain

1 - Make sure that you created your A records on your domain provider website.

2 - Change your pathname from Router

3 - Change your env files and add the new API address

4 - Add the following server config

```nginx
#reactJs
server {
 listen 80;
 server_name safakkocaoglu.com www.safakkocaoglu.com;

  location / {
  root /var/www/netflix/client;
  index  index.html index.htm;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
  try_files $uri $uri/ /index.html;
  }
}

#expressJS/api
server {
  listen 80;
  server_name api.safakkocaoglu.com;
  location / {
    proxy_pass http://45.90.108.107:8800;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    }
}

server {
  listen 80;
  server_name admin.safakkocaoglu.com;
  location / {
    root /var/www/netflix/admin;
    index  index.html index.htm;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    try_files $uri $uri/ /index.html;
  }
}
```

## SSL Certification

```bash
apt install certbot python3-certbot-nginx
```

Make sure that Nginx Full rule is available

```bash
ufw status
```

```bash
certbot --nginx -d example.com -d www.example.com
```

Let’s Encrypt’s certificates are only valid for ninety days. To set a timer to validate automatically:

```bash
systemctl status certbot.timer
```

## Install MariaDB Database Server

```bash
apt install mariadb-server mariadb-client

```

```bash
  systemctl status mariadb
  systemctl start mariadb
  systemctl enable mariadb
  mysql_secure_installation
```

- When it asks you to enter MariaDB root password, press Enter key as the root password isn’t set yet.
- Don’t switch to unix_socket authentication because MariaDB is already using unix_socket authentication.
- Don’t change the root password, because you don’t need to set root password when using unix_socket authentication.
- Next, you can press Enter to answer all remaining questions, which will remove anonymous user, disable remote root login and remove test database. This step is a basic requirement for MariaDB database security. (Notice that Y is capitalized, which means it is the default answer. )
- By default, the MaraiDB package on Ubuntu uses unix_socket to authenticate user login, which basically means you can use username and password of the OS to log into MariaDB console. So you can run the following command to log in without providing MariaDB root password.

```bash
mariadb -u root

exit;
```
