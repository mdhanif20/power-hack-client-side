import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const AddNewBillingModal = ({openNewBulling,handleNewBullingClose}) => { 
   
    const billingData = {
      name:"",
      email:"",
      phone:"",
      paidAmount:""
    }
    const [billing,setBilling] = useState(billingData);
    const OnBlurhandle = e =>{
      const field = e.target.name;
      const value = e.target.value;
      const newInfo = {...billing};
      newInfo[field] = value
      setBilling(newInfo);
  }
  
   
    const addNewBill = e =>{
      e.preventDefault();
        fetch("https://powerhack.investmentinsights360.com/api/add-billing",{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body: JSON.stringify(billing)
      })
      .then(res => res.json())
      .then(data=>{
        if(data.insertedId){
            alert("New Bill Added Successfully!")
          setInterval(() => {
          }, 18000);
        }
      })  
    }
    return (
        <Modal
        open={openNewBulling} 
        onClose={handleNewBullingClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box sx={{
             position: 'absolute',
             top: '50%',
             left: '50%',
             transform: 'translate(-50%, -50%)',
             bgcolor: 'background.paper',
             boxShadow: 24,
             width:{xs:"70%",sm:"60%",md:"50%"},
             px: 3,
             py: 2,
             borderRadius:"10px"
          }}>
            <Typography sx={{color:"black",mb:2}} id="modal-modal-title" variant="h6" component="h2">
            Add New Billing
            </Typography>
              
            <form onSubmit={addNewBill} style={{overflowY:"scroll",height:'350px'}}>
                    <Typography variant="subtitle1" display="block" gutterBottom>
                    Full Name
                    </Typography>
                    <input
                    required
                    style={{ width: "97%",border:"1px solid black",borderRadius:"5px",padding:"5px",fontWeight:"bolder",marginBottom:"10px" }}
                    onBlur={OnBlurhandle}
                    name="name"
                    type="text"
                    id="outlined-size-small"
                    placeholder="Name"
                    minRows={1}
                    />


                    <Typography variant="subtitle1" display="block" gutterBottom>
                    Email
                    </Typography>
                    <input
                    required
                    style={{ width: "97%",border:"1px solid black",borderRadius:"5px",padding:"5px",fontWeight:"bolder",marginBottom:"10px" }}
                    onBlur={OnBlurhandle}
                    type="email"
                    name="email"
                    id="outlined-size-small"
                    placeholder="Email"
                    minRows={1}
                    />


                    <Typography variant="subtitle1" display="block" gutterBottom>
                    Phone Number
                    </Typography>
                    <input
                    required
                    style={{ width: "97%",border:"1px solid black",borderRadius:"5px",padding:"5px",fontWeight:"bolder",marginBottom:"10px" }}
                    onBlur={OnBlurhandle}
                    type="tel" 
                    id="phone"
                    name="phone" 
                    pattern="^01[3-9]\d{8}$"
                    placeholder="01 xxx- must be 11 digit"
                    minRows={1}
                    />


                    <Typography variant="subtitle1" display="block" gutterBottom>
                    Paid Amount
                    </Typography>
                    <input 
                    required
                    style={{ width: "97%",border:"1px solid black",borderRadius:"5px",padding:"5px",fontWeight:"bolder" }}
                    onBlur={OnBlurhandle}
                    type="number"
                    name="paidAmount"
                    id="outlined-size-small"
                    placeholder="Paid Amount" 
                    minRows={1}
                    />
                    
                   
                 
                <Button
                style={
                    {
                        background:"black",
                        fontSize: "15px",
                        fontWeight:"600",
                        padding: "8px 20px",
                        width:"auto",
                        boxShadow: 0,
                        color:"#fff",
                        margin:"10px 0px"
                        }
                    } 
                    type="submit"
                    variant="contained">Add New Buill</Button>
              </form>
          </Box>
      </Modal>
    );
};

export default AddNewBillingModal;