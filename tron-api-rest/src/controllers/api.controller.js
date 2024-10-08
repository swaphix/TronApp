const TronWeb = require('tronweb');
const axios = require('axios');
const BigNumber = require('bignumber.js');

const { ENDPOINT, API_KEY, GAS_STATION_ADDRESS } = require("../common/constants");
const messages = require('../common/messages');

const tronWeb = new TronWeb({
  fullHost: ENDPOINT,
  headers: { 'TRON-PRO-API-KEY':API_KEY },
  // privateKey: 'your private key'
});
module.exports = {
  createAccount: async (req, res) => {
    try {
      // const { name, email, password, id_rol, id_organization } = req.body;
        // const response = await tronWeb.createAccount();
        const response =  await tronWeb.createAccount();
        // console.log(response)
        // await tronWeb.setPrivateKey(response.privateKey);
        // const responsemnemonic = tronWeb.createRandom();
        // const adressHex = await tronWeb.address.fromHex(responsemnemonic.privateKey)
        const data = {
          secret:response.privateKey,
          address:response.address.base58,
          mnemonic:'',
          // other:responsemnemonic,
          // account:response
        }

        return res.status(200).json({
          message: messages.success,
          data,
        });
        
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.toString(),
      });
    }
  },
  getAddress: async(req, res)=>{
    try{
      const {secret} = req.body;
      // ?limit=100
      const response = await tronWeb.address.fromPrivateKey(secret)
      // console.log(response)
      return res.status(200).json({
        message: messages.success,
        data: response
      });

    } catch(error){
    console.log(error);
      return res.status(500).json({
        message: error.toString(),
      });
    }
  },
  getAddressFromMMeniac: async(req, res)=>{
    try{
      const {mnemonic} = req.body;
      // ?limit=100
      const response = await tronWeb.fromMnemonic(mnemonic)
      // console.log(response)
      return res.status(200).json({
        message: messages.success,
        data: response
      });

    } catch(error){
    console.log(error);
      return res.status(500).json({
        message: error.toString(),
      });
    }
  },
  sendTRX: async(req, res)=>{
    try{
      const { toAddress, fromSecretAddress ,amount} = req.body;
      const amountTRX = amount * 1000000
      const toAddressHex = await tronWeb.address.toHex(toAddress)
      const response = await tronWeb.trx.sendTransaction(toAddressHex, amountTRX, fromSecretAddress)
      // const firmTransaction = await tronWeb.trx.sign(response, fromSecretAddress);
      // const result = await tronWeb.trx.sendRawTransaction(firmTransaction)
      return res.status(200).json({
        message: messages.success,
        data: response,
      });
    }catch(error){
      console.log(error);
      return res.status(500).json({
        message: error.toString(),
      });
    }
  },
  sendTRC20: async(req, res)=>{
    try{

      const { toAddress, fromSecretAddress, contractAddress, amount} = req.body;
      const amountUSDT = amount * 1000000
      // const secret = await tronWeb.toAscii(fromSecretAddress.toString());
      // const secret = await tronWeb.address.fromHex(fromSecretAddress)
      // const fromAddress = await tronWeb.address.fromPrivateKey(fromSecretAddress);
      // console.log(secret)
      // console.log(fromSecretAddress)
      // console.log(fromAddress)

      tronWeb.setPrivateKey(fromSecretAddress);
      const contractResponse =  await tronWeb.contract().at(contractAddress);
      // const functionSelector = 'transfer(address,uint256)';
      // const parameter = [{type:'adress', value:toAddress},{type:'uint256',value:amount}]
      // const tx = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, functionSelector, {}, parameter);
      // const signedTx = await tronWeb.trx.sign(tx.transaction, fromSecretAddress);
      const hash = await contractResponse.transfer(toAddress, amountUSDT).send({feeLimit: 100000000});


      return res.status(200).json({
        message: messages.success,
        data: hash,
      });
    }catch(error){
      console.log(error);
      return res.status(500).json({
        message: error.toString(),
      });
    }
  },
  getAccountInfo: async(req, res)=>{
    try {
      const {address} = req.params;
      // const respone = await tronWeb.trx.getAccount(address);
      const response = await axios.get(`${ENDPOINT}/v1/accounts/${address}`)
      return res.status(200).json({
        message: messages.success,
        data: response['data']['data'],
      });
    } catch (error) {
      return res.status(500).json({
        message: error.toString(),
      });
    }
  },
  getAccountResource: async(req, res)=>{
    try {
      const {address} = req.params;
      const respone = await tronWeb.trx.getAccountResources(address);
      return res.status(200).json({
        message: messages.success,
        data: respone,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.toString(),
      });
    }
  },
  undelegateResource: async(req, res)=>{
    try {
      const { toAddress, fromSecretAddress, resource, amount, options} = req.body;
      const amountTRX = amount * 1000000
      const fromAdress = tronWeb.address.fromPrivateKey(fromSecretAddress);
      const response = await tronWeb.transactionBuilder.undelegateResource(amountTRX, toAddress, resource, fromAdress, options);
      const signedResponse = await tronWeb.trx.sign(response, fromSecretAddress);
      const result = await tronWeb.trx.sendRawTransaction(signedResponse)
      return res.status(200).json({
        message: messages.success,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.toString(),
      });
    }
  },
  delegateResource: async(req, res)=>{
    try{
      const { toAddress, fromSecretAddress,lock, lockPeriod, options, resource, amount} = req.body;
      const amountTRX = amount * 1000000
      const fromAddress = await tronWeb.address.fromPrivateKey(fromSecretAddress);
      console.log(fromAddress)
      const response = await tronWeb.transactionBuilder.delegateResource(amountTRX, toAddress, resource, fromAddress, lock, lockPeriod, options);
      const signedResponse = await tronWeb.trx.sign(response, fromSecretAddress);
      console.log(JSON.stringify(signedResponse))
      const result = await tronWeb.trx.sendRawTransaction(signedResponse)
      return res.status(200).json({
        message: messages.success,
        data: result,
      });

    } catch(error){
    console.log(error);
      return res.status(500).json({
        message: error.toString(),
      });
    }
  },
  getTransactions: async(req, res)=>{
    try{
      const { address} = req.params;
      const response = await axios.get(`${ENDPOINT}/v1/accounts/${address}/transactions`);
      // console.log(response)
      return res.status(200).json({
        message: messages.success,
        data: response['data']['data'],
      });

    } catch(error){
    console.log(error);
      return res.status(500).json({
        message: error.toString(),
      });
    }
  },


  getTransactionsTRC20: async(req, res)=>{
    try{
      const {address, contract_address, limit, only_confirmed} = req.body;
      // ?limit=100
      const response = await axios.get(`${ENDPOINT}/v1/accounts/${address}/transactions/trc20?limit=${limit}&contract_address=${contract_address}&only_confirmed=${only_confirmed}`);
      // console.log(response)
      return res.status(200).json({
        message: messages.success,
        data: response['data']['data'],
      });

    } catch(error){
    console.log(error);
      return res.status(500).json({
        message: error.toString(),
      });
    }
  },

  getInfoTransaction: async(req, res)=>{
    try{
      const {id} = req.body;
      // ?limit=100
      const response = await tronWeb.trx.getTransactionInfo(id)
      console.log(response)
      return res.status(200).json({
        message: messages.success,
        data:response,
      });

    } catch(error){
    console.log(error);
      return res.status(500).json({
        message: error.toString(),
      });
    }
  },
  freezeResource: async(req, res)=>{
    try{
      const {amount, resource, secret, options} = req.body;
      // ?limit=100
      // const amountTRX = amount * 1000000
      const days =3 
      const address = await tronWeb.address.fromPrivateKey(secret);
      // console.log(address)
      const response = await tronWeb.transactionBuilder.freezeBalance(tronWeb.toSun(amount), days, resource, address, address)
      const signedResponse = await tronWeb.trx.sign(response, secret);
      const result = await tronWeb.trx.sendRawTransaction(signedResponse)
      console.log(signedResponse)
      return res.status(200).json({
        message: messages.success,
        data:result,
      });

    } catch(error){
    console.log(error);
      return res.status(500).json({
        message: error.toString(),
      });
    }
  },


  calculateResourceToTRX: async(req, res)=>{
    // retorna la cantidad de trx necesaria para obtener energuya
    try{
      const {amount, resource} = req.body;
      const amount_decimals = new BigNumber(amount);
      // const SUN_TO_TRX = new BigNumber('0.000001');
      let amount_result =0.0
      const respone = await tronWeb.trx.getAccountResources(GAS_STATION_ADDRESS);
      console.log(respone)
      if (resource==='ENERGY'){
        let trxPerEnergy = 0.0
        const totalEnergyLimit = new BigNumber(respone.TotalEnergyLimit);
        const totalEnergyWeight = new BigNumber(respone.TotalEnergyWeight);

        const energyPerTrx = totalEnergyLimit.dividedBy(totalEnergyWeight).decimalPlaces(6);
        const value = new BigNumber(1);
        trxPerEnergy = value.dividedBy(energyPerTrx).decimalPlaces(6);

        amount_result =  amount_decimals.multipliedBy(trxPerEnergy).decimalPlaces(6);
      }
      else{
        let bandwidthPerTrx = 0.0
        const totalNetLimit = new BigNumber(respone.TotalNetLimit);
        const totalNetWeight = new BigNumber(respone.TotalNetWeight);
        bandwidthPerTrx = totalNetLimit.dividedBy(totalNetWeight).decimalPlaces(6);
        const value = new BigNumber(1);

        const trxPerBandwidth = value.dividedBy(bandwidthPerTrx).decimalPlaces(6)

        amount_result =  amount_decimals.multipliedBy(trxPerBandwidth).decimalPlaces(6);

      }
      return res.status(200).json({
        message: messages.success,
        data:amount_result,
      });
    } catch(error){
    console.log(error);
      return res.status(500).json({
        message: error.toString(),
      });
    }
  },
  calculatenNetToTRX: async(req, res)=>{
    // retorna la cantidad de trx necesaria para obtener energuya
    try{
      const {amount_energy} = req.body;
      amount_energy_decimals = new BigNumber(amount_energy);
      // const SUN_TO_TRX = new BigNumber('0.000001');
      let trxPerEnergy = 0.0
      let amount =0.0
      const respone = await tronWeb.trx.getAccountResources(GAS_STATION_ADDRESS);
      const totalEnergyLimit = new BigNumber(respone.TotalEnergyLimit);
      const totalEnergyWeight = new BigNumber(respone.TotalEnergyWeight);

      const energyPerTrx = totalEnergyLimit.dividedBy(totalEnergyWeight).decimalPlaces(6);
      const value = new BigNumber(1);
      trxPerEnergy = value.dividedBy(energyPerTrx).decimalPlaces(6);

      amount =  amount_energy_decimals.multipliedBy(trxPerEnergy).decimalPlaces(6);
      return res.status(200).json({
        message: messages.success,
        data:amount,
      });
    } catch(error){
    console.log(error);
      return res.status(500).json({
        message: error.toString(),
      });
    }
  },

  validateAddress: async(req, res)=>{
    // retorna la cantidad de trx necesaria para obtener energuya
    try{
      const {address} = req.body;
      const response = tronWeb.isAddress(address)
      return res.status(200).json({
        message: messages.success,
        data:response,
      });
    } catch(error){
    console.log(error);
      return res.status(500).json({
        message: error.toString(),
      });
    }
  },
}