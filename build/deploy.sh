#!bin/sh

if [ ! -d "node_modules" ]; then
    npm install --save-dev
    echo 'npm install finished'
fi

sleep 5s

# -d: post data
# -b, --cookie: tell curl a file to read cookies from and start the cookie engine, or if it isn't a file it will pass on the given string. -b name=var works and so does -b cookiefile.
# -c, --cookie-jar: tell curl to start the cookie engine and write cookies to the given file after the request(s)
curl -d 'data=xxx&jenkins' -c cookies urlA

curl -b cookies -c cookies -d 'data=yyy' jenkinsUrl
echo "部署完成 ${date}"