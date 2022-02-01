import { Grid, Paper } from "@mui/material"
import Form from "src/reusable/Form"
import {initialDropState, SubSteps, Steps} from "src/views/drops/Steps"


export default () => {
    return (
        <Form initialValues={initialDropState} validate={() => {}} onSubmit={() => {}}>
            <FormFields/>
        </Form>
    )
}


export const FormFields = () => {
    return (
        <Grid container spacing={3}>
            {/* Page Step */}
            <Grid item lg={12}>
                <Paper
                sx={{

                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: 2,
                }}
                >
                    <Steps/>
                </Paper>
            </Grid>
            <Grid item xs={1} md={2} lg={3}>
                <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
                >
                    <SubSteps/>
                </Paper>
            </Grid>
            <Grid item xs={11} md={10} lg={9} sx={{height: "100%"}}>
                <Grid container spacing={3}>
                    <Grid item lg={12}>
                        <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                        >
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    )
}