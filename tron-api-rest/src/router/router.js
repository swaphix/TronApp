const { Router } = require("express");
const { createAccount, sendTRX, sendTRC20, getAccountResource, getAccountInfo, undelegateResource, delegateResource, getTransactions, getTransactionsTRC20, getInfoTransaction, freezeResource, calculateEnergyToTRX, calculateResourceToTRX, getAddress, getAddressFromMMeniac, validateAddress } = require("../controllers/api.controller");
const router = Router();
router.post("/accounts", createAccount);
router.get("/accounts/resource/:address", getAccountResource);
router.get("/accounts/:address", getAccountInfo);
router.get("/accounts/transactions/:address", getTransactions);
router.post("/accounts/transactions/trc20", getTransactionsTRC20);
router.post("/accounts/transactions/info", getInfoTransaction);

router.post("/accounts/from-secret", getAddress);
router.post("/accounts/from-mnemonic", getAddressFromMMeniac);
router.post("/accounts/validate-address", validateAddress);





// router.post("/accounts/transactions/detail", getTransactionById);


// router.get("/accounts/bandwidth-available/:address", getAccountBandWidthAvailable);


router.post("/resource/undelegate", undelegateResource);
router.post("/resource/delegate", delegateResource);
router.post("/resource/freeze", freezeResource);
router.post("/resource/calculate/resource-to-trx", calculateResourceToTRX);



// getAccountBandWidthAvailable

router.post("/transactions/send-trx", sendTRX);
router.post("/transactions/send-trc20", sendTRC20);





module.exports = router;
