# A simple bash script to be used as a cron job to periodically run download utility
# export your key so cron job can use it
# export MAXMIND_LICENSE_KEY=
mkdir -p ~/logs
~/d/geo-ip-service/scripts/postinstall.js 1>> ~/logs/geo-cron.out 2>> ~/logs/geo-cron.err