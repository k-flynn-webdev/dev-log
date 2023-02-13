#!/bin/bash
#!/usr/bin/env bash

script_location=$(dirname $0)
echo $script_location
cd $script_location
pwd

rm -rf ./public/*

cp -R ../FE/dist/ ./public
