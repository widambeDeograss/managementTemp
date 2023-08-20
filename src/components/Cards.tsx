import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import { customCardInterface } from "./utilities/interfaces"

export const CustomCard:React.FC<customCardInterface> = ({ title, child }) => {

    return(
        <Card sx={{ mx:2 }}>
            <CardHeader title={title}/>
            <CardContent>{ child }</CardContent>
        </Card>
    )
}