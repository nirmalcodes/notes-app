import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface MemoDialogProps {
    open: boolean;
    onClose: () => void;
    editingMemo?: string;
}

const MemoDialog = () => {
  return (
    <>
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>

                </DialogTitle>
            </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MemoDialog;
