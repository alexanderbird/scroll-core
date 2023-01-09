build_directory="$1"

[[ "$build_directory" = "" ]] && {
  echo "Missing required parameter: build directory"
  exit 1
}
echo '{"1-1-1":{}}' > "$build_directory/bible.json"
