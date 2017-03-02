# Packet manager for bem-based interface prototyping
## Installation
Before you need [Node.js with npm](https://nodejs.org/en/) installed on your system.
Then run command in Terminal.

```bash
npm install -g git+https://git@github.yandex-team.ru:serp-design/dpt.git
```

In case of error, run command with `sudo`. But better solution of the error is
to [change folder for global npm-modules](https://docs.npmjs.com/getting-started/fixing-npm-permissions).
```bash
sudo npm install -g git+https://git@github.yandex-team.ru:serp-design/dpt.git
```

## Use
If you want to create new project, you should init it first.
```bash
mkdir ~/Sites
cd ~/Sites
dpt new myproject
cd myproject
dpt start
```

`⌃+C`

To run Depot in existing project navigate to it's directory and run `dpt`.
```bash
cd ~/Sites/myproject
dpt
```



## Setting deployment process
```
http://%path-to-your-project%/git-api/pull-changes/  
```

## How to make your own build

If you want change wiki UI for your needs, you should rebuild **dpt**.

Go to the folder with **dpt** `cd ~/your-path/dpt` and instal dependencies
```bash
npm install
```

To use you dev-version of **dpt** you should link it with global **dpt**
```
sudo npm link
```

In **separate** tabs start watchers
```bash
npm run babel -- --watch
```

```bash
npm run webpack -- --watch
```

Now you can make changes in **dpt** and test them on localhost

After finishing the work rebuild new version **dpt** for production/
```
npm run babel
npm run webpack -- -p
```

After commiting changes to server, you should unlink **dpt** from local source.
```
sudo npm unlink
```

Now you can update you global **dpt** package with command
```
npm install -g git+https://git@github.com/path-to-you-dpt-version.git
```
