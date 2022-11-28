import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useRole } from '../../context/RoleDataContext'
import Navbar from '../../components/Navbar'
import { useStyles } from '../../components/Styles'
import Grid from '@material-ui/core/Grid'
import Loader from '../../components/Loader'
import { usePosition } from 'use-position'

export default function Manufacture(props) {
  const supplyChainContract = props.supplyChainContract
  const classes = useStyles()
  const { roles } = useRole()
  const [loading, setLoading] = React.useState(false)
  const [fvalid, setfvalid] = React.useState(false)
  const watch = true
  const { latitude, longitude } = usePosition(watch, {
    enableHighAccuracy: true,
  })

  const latitude_s=String(latitude);
  const longitude_s=String(longitude);


  const navItem = [
    ['Add Product', '/manufacturer/manufacture'],
    ['Ship Product', '/manufacturer/ship'],
    ['All Products', '/manufacturer/allManufacture'],
  ]
  const [manuForm, setManuForm] = React.useState({
    id: 0,
    farmerName: '',
    farmerDetails: '',
    farmerLongitude: longitude,
    farmerLatitude: latitude,
    productType: '',
    SlaughterHouse:'',
    AverageWeight:'',
    Age:0,
    CarcassWeight:'',
    VetId:'',
    productPrice: 0,
   
  });

  const handleChangeManufacturerForm = async (e) => {
    setManuForm({
      ...manuForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitManufacturerForm = async () => {
    setLoading(true);

    if (
      manuForm.farmerName !== '' &&
      manuForm.farmerDetails !== '' &&
      manuForm.farmerLongitude !== '' &&
      manuForm.farmerLatitude !== '' &&
      manuForm.productType !=='' &&
      manuForm.SlaughterHouse !=='' &&
      manuForm.AverageWeight !=='' &&
      manuForm.Age !=='' &&
      manuForm.CarcassWeight !=='' &&
      manuForm.VetId !=='' &&
      manuForm.productType !=='' &&   
      
      manuForm.productPrice !== 0 
     
    ) {
      setfvalid(false);
      await supplyChainContract.methods
        .manufactureProduct(
          manuForm.farmerName,
          manuForm.farmerDetails,
         manuForm.farmerLongitude=longitude_s,
         manuForm.farmerLatitude=latitude_s,
         manuForm.productType,
         manuForm.SlaughterHouse,
         manuForm.AverageWeight,
         parseInt(manuForm.Age),
         manuForm.CarcassWeight,
         manuForm.VetId,   
        parseInt(manuForm.productPrice))
          
      .send({ from: roles.farmer, gas: 999999 })
        // .then(console.log)
        .on('transactionHash', function (hash) {
          handleSetTxhash(hash)
        })
      setManuForm({
        id: 0,
        farmerName: '',
        farmerDetails: '',
        farmerLongitude:'',
        farmerLatitude:'',
        productType: '',
        SlaughterHouse:'',
        AverageWeight:'',
        Age:0,
        CarcassWeight:'',
        VetId:'',
        productPrice: 0,
        
      })
    } else {
      setfvalid(true)
    }
    setLoading(false)
  }

  const handleSetTxhash = async (hash) => {
    await supplyChainContract.methods
      .setTransactionHashOnManufacture(hash)
      .send({ from: roles.farmer, gas: 900000 })
  }

  const createProduct = async () => {
    setLoading(true)
    for (var i = 0; i < 10; i++) {
      await supplyChainContract.methods
        .manufactureProduct(
          "product" + i,
                    "farmer" + 1,
                    "98",
                    "89",
                    "mi" + i,
                    99 + i,
                    12000,
                    "meat"
        )
        .send({ from: roles.farmer, gas: 999999 })
        .on('transactionHash', function (hash) {
          handleSetTxhash(hash)
        })
    }
    setLoading(false)
  }

  return (
    <>
      <Navbar pageTitle={'Farmer'} navItems={navItem}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className={classes.FormWrap}>
              <h1 className={classes.pageHeading}>Add Product</h1>
              <Grid container spacing={3}>
              <Grid item xs={12}>
                  <TextField
                    required
                    name="farmerName"
                    variant="outlined"
                    value={manuForm.farmerName}
                    onChange={handleChangeManufacturerForm}
                    label="Farmer Name"
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="farmerDetails"
                    variant="outlined"
                    value={manuForm.farmerDetails}
                    onChange={handleChangeManufacturerForm}
                    label="farmer Details"
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    name="farmerLongitude"
                    variant="outlined"
                    readOnly={true}
                    InputLabelProps={{
                        shrink: true,
                      }}
                    value={manuForm.farmerLongitude=longitude_s}
                    onChange={handleChangeManufacturerForm}
                    label="Longitude"
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    name="farmerLatitude"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                      }}
                    readOnly={true}
                    value={manuForm.farmerLatitude=latitude_s}
                    onChange={handleChangeManufacturerForm}
                    label="Latitude"
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    name="productType"
                    variant="outlined"
                    value={manuForm.productType}
                    onChange={handleChangeManufacturerForm}
                    label="Product Type"
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    name="SlaughterHouse"
                    variant="outlined"
                    value={manuForm.SlaughterHouse}
                    onChange={handleChangeManufacturerForm}
                    label="Slaughter House/SlaugterId"
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    name="AverageWeight"
                    variant="outlined"
                    value={manuForm.AverageWeight}
                    onChange={handleChangeManufacturerForm}
                    label="Average Weight in Kg"
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    name="Age"
                    variant="outlined"
                    value={manuForm.Age}
                    onChange={handleChangeManufacturerForm}
                    label="Age in Months"
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    name="CarcassWeight"
                    variant="outlined"
                    value={manuForm.CarcassWeight}
                    onChange={handleChangeManufacturerForm}
                    label="Carcasss Weight"
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    name="VetId"
                    variant="outlined"
                    value={manuForm.VetId}
                    onChange={handleChangeManufacturerForm}
                    label="VetId"
                    style={{ width: '100%' }}
                  />
                </Grid>
                    <Grid item xs={12}>
                  <TextField
                    required
                    name="productPrice"
                    variant="outlined"
                    value={manuForm.productPrice}
                    onChange={handleChangeManufacturerForm}
                    label="Product Price"
                    style={{ width: '100%' }}
                  />
                </Grid>
              
              </Grid>
              <br />
              <p>
                <b style={{ color: 'red' }}>
                  {fvalid ? 'Please enter all data' : ''}
                </b>
              </p>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmitManufacturerForm}
              >
                SUBMIT
              </Button>

              <br />
              <br />
            </div>
          </>
        )}
      </Navbar>
    </>
  )
}
