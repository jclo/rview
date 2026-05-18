#!/bin/bash

show_help() {
  echo "Usage: ./run.sh [command]"
  echo ""
  echo "Commands:"
  echo "  to-mjs        Replace <file>.js with <file>.mjs in @mobilabs/<module> package.json main:"
  echo "  back-to-js    Restitute package.json to initial state"   
  echo "  help          Show this help"
}

case "$1" in
  to-mjs)
    echo "Converting kzlog.js to kzlog.mjs in @mobilabs/kzlog/package.json..."
    sed -i '.bak' 's/"main": "_dist\/lib\/kzlog.js"/"main": "_dist\/lib\/kzlog.mjs"/' ./node_modules/@mobilabs/kzlog/package.json
    echo "done"
    ;;

  back-to-js)
    echo "Returning @mobilabs/kzlog/package.json in its initial state..."
    mv ./node_modules/@mobilabs/kzlog/package.json.bak ./node_modules/@mobilabs/kzlog/package.json
    echo "done"
    ;;

  help | *)
    show_help
    ;;
esac

# -- oOo --
