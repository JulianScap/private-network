# does not work yet
exit 1

. ./aliceBE.sh &
P1=$!
. ./aliceFE.sh &
P2=$!
. ./bobBE.sh &
P3=$!
. ./bobFE.sh &
P4=$!
. ./charlieBE.sh &
P5=$!
. ./charlieFE.sh &
P6=$!

wait $P1 $P2 $P3 $P4 $P5 $P6
