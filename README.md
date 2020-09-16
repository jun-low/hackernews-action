# 🗞 hackernews-action
Get top 5 daily hacker news with GitHub action.

## Usage
Get top 5 hacker news everyday.

```
name: 🗞 Daily Top HackerNews

on:
  schedule:
    - cron: '0 9 * * *' # Every day at 9am
  push:
    branches: [ master ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: checkout
      uses: actions/checkout@v2

    - name: daily-top-hackernews
      id: hackernews
      uses: ./ # Uses an action in the root directory
      with:
        run: echo "${{ steps.hackernews.outputs.msg }}"
        news: 5
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
