# USAGE: bash run-many-times.sh <BASH_COMMAND>
# Example 1: bash run-many-times.sh "echo Hello"
# Example 2: bash run-many-times.sh "yarn test test/example-pseudo-random.test.js"

for ((n = 0; n < 1000; n++)); do
  printf "\n\n\n\n\n=== RUNNING ITERATION NR: $n ===\n\n"
  $1
done
