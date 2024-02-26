import { TextField, Box, MenuItem, Button, FormControl, InputLabel, Select } from "@mui/material";
import '../SettingPage.css';

const currencies = [
    {
      value: 'USD',
      label: 'Tower A, Floor 1',
    },
    {
      value: 'EUR',
      label: 'Tower A, Floor 1',
    },
    {
      value: 'BTC',
      label: 'Tower A, Floor 1',
    },
    {
      value: 'JPY',
      label: 'Tower A, Floor 1',
    },
  ];
  
function DeviceManage() {
    return ( 
        <div className="DeviceManage">
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <div className="form-row">
                    <div style={{width: 100}}>
                        <span>Builing</span>
                    </div>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="Building-select-small-label">Building</InputLabel>
                            <Select
                                labelId="Building-select-small-label"
                                id="Building-select-small"
                                // value={age}
                                label="Building"
                                // onChange={handleChange}
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="form-row">
                    <div style={{width: 100}}>
                        <span>Floor</span>
                    </div>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="Floor-select-small-label">Floor</InputLabel>
                            <Select
                                labelId="Floor-select-small-label"
                                id="Floor-select-small"
                                // value={age}
                                label="Floor"
                                // onChange={handleChange}
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="form-row">
                    <div style={{width: 100}}>
                        <span>Location</span>
                    </div>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="Location-select-small-label">Location</InputLabel>
                            <Select
                                labelId="Location-select-small-label"
                                id="Location-select-small"
                                // value={age}
                                label="Location"
                                // onChange={handleChange}
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="form-row-action">
                    <Button variant="outlined" size="large">
                        Cancel
                    </Button>
                    <Button variant="contained" size="large">
                        Save
                    </Button>
                </div>
            </Box>
        </div>
     );
}

export default DeviceManage;