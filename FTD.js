const readline = require("readline");
const open = require("open");
const { RSA_X931_PADDING } = require("constants");

let addresses = [];
let launched = false;
let explorers = new Map();
const line = () => {
  console.log(
    "\x1b[34m%s\x1b[0m",
    "====================================================================================================="
  );
};

const logoArt = () => {
  console.log(
    `\x1b[34m%s\x1b[0m`,
    `



                                     ,,,,,,,,,,,,,,,,,,,,,,.             
                                   ,,,,,,,,,,,,,,,,,,,,,,,,,,.           
                                  ,,,,,,,,,          .,,,,,,,,,          
                                ,,,,,,,.    .,,,,,,,.    ,,,,,,,.        
                              ,,,,,,    ,,,,       ,,,,   .,,,,,,       
                            ,,,,,,,   ,,,    ,,,,.    ,,,   ,,,,,,.     
                           ,,,,,,,   ,,,   ,,,  ,,,,   ,,,  .,,,,,,.    
                          .,,,,,,,   ,,,  ,,,     ,,,  ,,,   ,,,,,,..   
                           .,,,,,,   ,,,        ,,,,   ,,,  .,,,,,,.    
                            .,,,,,,   ,,    ,,,,,     ,,,   ,,,,,,.     
                              ,,,,,,      ,,,,,   ,,,,,   ,,,,,,.       
                                ,,,,,,, ,,,,,,,,,,,,     ,,,,,,,.        
                                  ,,,,,,,,,,,,,,     ,,,,,,,,,.          
                                   .,,,,,,,,,,,,,,,,,,,,,,,,..           
                                     ..,,,,,,,,,,,,,,,,,,...              

                         `
  );
};

explorers.set("eth", "https://etherscan.io/address/");
explorers.set("bsc", "https://bscscan.com/address/");
explorers.set("poly", "https://polygonscan.com/address/");
explorers.set("avax", "https://snowtrace.io/address/");
explorers.set("one", "https://explorer.harmony.one/address/");
explorers.set("tron", "https://tronscan.org/#/contract/");
explorers.set("tt", "https://viewblock.io/thundercore/address/");
explorers.set("iotex", "https://iotexscan.io/address/");
explorers.set("waves", "https://wavesexplorer.com/address/");
explorers.set("wax", "https://wax.bloks.io/account/");
explorers.set("tz", "https://tzstats.com/");
explorers.set("ftm", "https://ftmscan.com/address/");
explorers.set("sol", "https://explorer.solana.com/address/");
explorers.set("near", "https://explorer.near.org/accounts/");
explorers.set("okex", "https://www.oklink.com/okexchain/address/");
explorers.set("flow", "https://flowscan.org/account/0x");
explorers.set("tel", "https://telos.eosx.io/account/");
explorers.set("eos", "https://bloks.io/account/");
explorers.set("kltn", "https://v2.scope.klaytn.com/account/");
explorers.set("algo", "https://algoexplorer.io/application/");
explorers.set("hive", "https://www.hiveblockexplorer.com/@");
explorers.set("heco", "https://hecoinfo.com/address/");
explorers.set("fton", "https://tonscan.io/accounts/0:");
explorers.set("immx", "https://immutascan.io/address/");
explorers.set("fuse", "https://explorer.fuse.io/address/");
explorers.set("mrvr", "https://moonriver.moonscan.io/address/");
explorers.set("cro", "https://cronos.crypto.org/explorer/address/");
explorers.set("mnbm", "https://moonscan.io/address/");
explorers.set("shdn", "https://shiden.subscan.io/account/");
explorers.set("osis", "https://explorer.emerald.oasis.dev/address/");
explorers.set("shdn", "https://shiden.subscan.io/account/");
explorers.set("celo", "https://explorer.celo.org/address/");
explorers.set("rsk", "https://explorer.rsk.co/address/");
explorers.set("astr", "https://blockscout.com/astar/address/");
explorers.set("kard", "https://explorer.kardiachain.io/address/");
explorers.set("opti", "https://optimistic.etherscan.io/address/");
explorers.set("stak", "https://explorer.stacks.co/txid/");
explorers.set("hede", "https://v2.explorer.kabuto.sh/id/");
explorers.set("auro", "https://aurorascan.dev/address/");
explorers.set("thet", "https://explorer.thetatoken.org/account/");
explorers.set(
  "milk",
  "https://explorer-mainnet-cardano-evm.c1.milkomeda.com/address/"
);

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = () => {
  if (!launched) logoArt();
  launched = true;
  line();
  console.log(
    "\x1b[37m%s\x1b[0m",
    "Supported Protocols - " + Array.from(explorers.keys()).toString()
  );
  line();
  rl.question("Enter Dapp Protocol: ", (protocol) => {
    if (Array.from(explorers.keys()).includes(protocol.toLowerCase())) {
      line();
      console.log("Paste the contracts from the dev dashboard: ");
      line();

      rl.on("line", (input) => {
        if (input === "") {
          rl.close();
        } else addresses.push(input);
      });

      rl.on("close", () => {
        console.log("\x1b[32m%s\x1b[0m", "Opening contracts...");
        addresses.map((addr) => {
          open(explorers.get(protocol.toLowerCase()) + addr, function (err) {
            if (err) throw err;
          });
        });
      });
    } else {
      console.log("\033[2J");
      console.log(
        "\x1b[33m%s\x1b[0m",
        "Not a supported protocol, restarting..."
      );
      prompt();
    }
  });
};

prompt();
