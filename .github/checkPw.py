import glob
import re
import hashlib
import sys

forbidden = ["d14a0bc326d349cf670538b90066b654a21d59881514cc7d33c69258a59da721", "12a0d9ea3b6f95d5bfcbb39b0ad6331d139971cd80343c0654f694baa34a65e5", "12a0d9ea3b6f95d5bfcbb39b0ad6331d139971cd80343c0654f694baa34a65e5"]
found = 0

for s in glob.glob('**/*.cs', recursive=True):
  for f in re.findall(r'".{2,100}"',open(s).read(), re.MULTILINE):
      if hashlib.sha256(f.lower().encode('utf-8')).hexdigest() in forbidden:
          found+=1
          print("Found Simons credentials in " + s)

if found > 0:
    print("Found " + str(found) + " times!")

sys.exit(found)
