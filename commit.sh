#/bin/bash
git add .
echo "####### Git Add ALL #######"
git commit -m "$1"
echo "####### Git commit master #######"
git pull origin master
echo "####### Git pull master #######"
git push -u origin master
echo "####### Push Git Master #######"