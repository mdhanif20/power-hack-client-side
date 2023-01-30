import React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


const UpdateBilling = ({openUpdateBillingModal,closeBillingUpdateModal,bill}) => { 

    const [updatedBill,setUpdatedBill] = useState({});
    useEffect(()=>{
        const billData = {
            name:`${bill?.name}`,
            email:`${bill?.email}`,
            phone:`${bill?.phone}`,
            paidAmount:`${bill?.paidAmount}`
          }
          setUpdatedBill(billData)
    },[bill])


    const OnBlurhandle = e =>{
      const field = e.target.name;
      const value = e.target.value;
      const newInfo = {...updatedBill};
      newInfo[field] = value
      setUpdatedBill(newInfo);
  }

    const updatebillData = id =>{
            const url = `https://powerhack.investmentinsights360.com/api/update-billing/${id}`;
            fetch(url,{
                method:"PUT",
                headers:{
                    'content-type':"application/json"
                },
                body: JSON.stringify(updatedBill)
            })
            .then(res => res.json())
            .then(data =>{
                if(data.modifiedCount>0){
                    alert("Bill Updated Successfully")
                }
            }) 
    }
    return (
        <Modal
        open={openUpdateBillingModal} 
        onClose={closeBillingUpdateModal}
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
             width:{xs:"70%",sm:"50%",md:"40%"}, 
             px: 3,
             py: 2,
             borderRadius:"10px"
          }}>
            <Typography sx={{color:"black",mb:2}} id="modal-modal-title" variant="h6" component="h2">
            Update Bill Info
            </Typography>
            
              <form style={{overflowY:"scroll",height:"350px"}} >
                    <Typography variant="subtitle1" display="block" gutterBottom>
                    Full Name
                    </Typography>
                    <input
                    style={{ width: "97%",border:"1px solid black",borderRadius:"5px",padding:"5px",fontWeight:"bolder",marginBottom:"10px" }}
                    onBlur={OnBlurhandle}
                    name="name"
                    type="text"
                    id="outlined-size-small"
                    defaultValue={bill?.name} 
                    minRows={1}
                    />
                    <Typography variant="subtitle1" display="block" gutterBottom>
                    Email
                    </Typography>
                    <input
                    style={{ width: "97%",border:"1px solid black",borderRadius:"5px",padding:"5px",fontWeight:"bolder" ,marginBottom:"10px" }}
                    onBlur={OnBlurhandle}
                    type="email"
                    name="email"
                    id="outlined-size-small"
                    defaultValue={bill?.email} 
                    minRows={1}
                    />

                    <Typography variant="subtitle1" display="block" gutterBottom>
                    Phone
                    </Typography>
                    <input
                    style={{ width: "97%",border:"1px solid black",borderRadius:"5px",padding:"5px",fontWeight:"bolder" ,marginBottom:"10px" }}
                    onBlur={OnBlurhandle}
                    type="tel" 
                    id="phone"
                    name="phone" 
                    pattern="^01[3-9]\d{8}$"
                    defaultValue={bill?.phone} 
                    minRows={1}
                    />

                    <Typography variant="subtitle1" display="block" gutterBottom>
                    Paid Amount
                    </Typography>
                    <input
                    style={{ width: "97%",border:"1px solid black",borderRadius:"5px",padding:"5px",fontWeight:"bolder" ,marginBottom:"10px" }}
                    onBlur={OnBlurhandle}
                    type="number"
                    name="paidAmount"
                    id="outlined-size-small"
                    defaultValue={bill?.paidAmount} 
                    minRows={1}
                    />
                   
                 
                <Button 
                onClick={()=> updatebillData(bill._id)}
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
                    
                    variant="contained">Update Bill</Button>
              </form>

          </Box>
      </Modal>
    );
};

export default UpdateBilling;