import glob
import re
import hashlib
import sys

print(hashlib.sha256(input().lower().encode('utf-8')).hexdigest())
