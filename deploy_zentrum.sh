#! /bin/bash
ssh -t zentrum@web.bitnik.org "cd calculated-control/; git pull; npm run build"

