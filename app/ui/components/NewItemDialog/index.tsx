import React, {useState} from 'react';
import Dialog from 'react-native-dialog';

// import {style} from './styles';

interface ISelectedHour {
  id: number;
  title: string;
}

interface IProps {
  isDialogOpen: boolean;
  showDialogOpen(newValue: boolean): void;
  selectedHour: ISelectedHour | {id: ''; title: ''};
  onNewItem(text: string): void;
}

const NewItemDialog: React.FC<IProps> = ({
  isDialogOpen,
  showDialogOpen,
  selectedHour,
  onNewItem = () => {},
}) => {
  const [text, setText] = useState('');

  function close() {
    showDialogOpen(false);
    setText('');
  }

  function addItem() {
    if (text) {
      onNewItem(text);
      close();
    }
  }

  return (
    <Dialog.Container visible={isDialogOpen}>
      <Dialog.Title>{`Nova tarefa - ${selectedHour.title}`}</Dialog.Title>
      <Dialog.Input value={text} onChangeText={(value) => setText(value)} />
      <Dialog.Button label="Cancelar" onPress={close} />
      <Dialog.Button label="Adicionar" onPress={addItem} />
    </Dialog.Container>
  );
};

export default NewItemDialog;
