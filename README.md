# gmail-local-download
Allows to download email from GMail locally as .eml files


This is a google apps script https://script.google.com/home/start
Recommend following extension to connect your Apps Scripts with git: https://chrome.google.com/webstore/detail/google-apps-script-github/lfjcgcmkmjjlieihflfhjopckgpelofo

This is a very basic first release.

## Functionality
- Downloads all emails in a conversation/thread matching a search filter condtion one by one as `.eml` files. Means Raw email text, which can be viewed/imported by most standalone email applications.
- Successfully downloaded threads are labeled with `LABLE_DONE = 'done_by_me'`, create this lable frist. 
- Customize your search query for your on needs in `code.gs` line ~23. Keep `AND NOT label:'+ LABLE_DONE +` to exclude already downloaded Threads.

## TODO / Know issues
the way to trigger the downloads via JS in `form.html` is outdated and may be broken in furture versions of the browser. Suggestions and PRs are welcome. 

_Attention_: Lables could be only applied to a Thread, not to a single emails, at least if you has configured the conversation mode. Therefore the script download the whole thread (each email in a separate file) and not a single email from a thread.

Switchig off the conversation mode, could screw up all your existing lables and requires a complete resync of all offline data. So nothing you want to switch forth and back. 
