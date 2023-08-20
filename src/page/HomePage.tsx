import { Typography } from "@mui/material"
import { CustomCard } from "../components/Cards"

const HomePage = () => {
    return(
        <CustomCard title="Home" child={
            <Typography>Welcome User</Typography>
        }/>
    )
}

export default HomePage;