#!/bin/bash

DBUSER=
DBPASS=
DBNAME=
DBSERVER=

DATAFILE=../data/SIM_INERC_1073.txt 

TMPDIR=$(mktemp /tmp/sim2sql.XXXXXX)
TMPDIR=out
echo "file: $DATAFILE"
sed -e s/\\r//g $DATAFILE| awk -v d=$(date +%d) -v m=$(date +%m) -v y=$(date +"%Y") '$1 > d && $2 > m && y==$3 {print "insert into _TABLE_(data,cota,vazao) values("$3$2$1","$4",0)" }' > $TMPDIR.sql
echo "created: $TMPDIR.sql"
#atualizando o banco
#psql -d $DBNAME -a -f $TMPDIR.sql

[ $? -ne 0 ] && { echo "ERR"; }
