alias yolo='git aa && git commit -m "$(curl -s https://whatthecommit.com/index.txt)"'
alias ls="exa --git"
alias lla="exa --git"

# Add your shell preferences in .devcontainer/scripts/custom.sh
if [[ -f /home/node/scripts/custom.sh ]]; then
    source /home/node/scripts/custom.sh
fi
