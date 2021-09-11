#!/usr/bin/env sh
sed -i "s|\$PORT|$PORT|g" /etc/nginx/conf.d/default.conf
for file in $FILES;
do
  sed -i "s|\$REACT_APP_BACKEND_BASE_URL|$REACT_APP_BACKEND_BASE_URL|g" $file
done
nginx -g 'daemon off;'