import React, {useState} from 'react';
import {SafeAreaView, SectionList, StatusBar} from 'react-native';
import ListHeader from './app/ui/components/ListHeader';
// import Intro from './app/ui/views/Intro';
import ListItem from './app/ui/components/ListItem';
import NewItemDialog from './app/ui/components/NewItemDialog';

interface IItem {
  id: number;
  title: string;
  data: {
    id: number;
    title: string;
    timeId: number;
  }[];
}

interface ISelectedHour {
  id: number;
  title: string;
}

const mockItems = [
  {id: 1, title: '00:00', data: [{id: 1, title: 'Café da manhã', timeId: 1}]},
  {id: 2, title: '16:00', data: [{id: 2, title: 'Café da tarde', timeId: 1}]},
];

const App = () => {
  // const [isOpen, showOpen] = useState(false);
  const [items, setItems] = useState<IItem[]>(mockItems);
  const [selectedHour, setSelectedHour] = useState<ISelectedHour>({
    id: 1,
    title: '',
  });
  const [isOpenDialog, showOpenDialog] = useState(false);

  // function onOpen() {
  //   showOpen(true);
  // }

  function onNewItem(title: string) {}

  function selectHour(newSelectedHour: ISelectedHour) {
    setSelectedHour(newSelectedHour);
    showOpenDialog(true);
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        {/* {!isOpen && <Intro onOpen={onOpen} />} */}

        <SectionList
          sections={items}
          keyExtractor={(item) => item.title}
          renderSectionHeader={({section}) => (
            <ListHeader onPress={selectHour} item={section as IItem} />
          )}
          renderItem={({item}) => <ListItem item={item} />}
          stickySectionHeadersEnabled={true}
        />
        <NewItemDialog
          isDialogOpen={isOpenDialog}
          showDialogOpen={showOpenDialog}
          onNewItem={onNewItem}
          selectedHour={selectedHour}
        />
      </SafeAreaView>
    </>
  );
};

export default App;
