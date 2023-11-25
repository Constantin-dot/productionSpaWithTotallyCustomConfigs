cd ~/productionSpaWithTotallyCustomConfigs
npm run build:prod

rm -rf ~/../var/www/productionSpaWithTotallyCustomConfigs/html
mv ~/productionSpaWithTotallyCustomConfigs/build ~/../var/www/productionSpaWithTotallyCustomConfigs/html
