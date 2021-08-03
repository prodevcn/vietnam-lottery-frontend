import { Dialog, DialogContent } from '@material-ui/core';

const FetchingDlg = props => {
  return(
      <Dialog open={props.showFlag} aria-labelledby="fetching-dialog-title" aria-describedby="fetching-dialog-description" style={{position: "absolute", width: 100, backgroundColor: "red", height: 100}}>
        <DialogContent>
            <img src="/images/fetching.gif" width="20%" height="20rem" />
        </DialogContent>
      </Dialog>
  );  
};

export default FetchingDlg;