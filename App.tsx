import React, {useState} from 'react';
import {SafeAreaView, SectionList, StatusBar} from 'react-native';
import ListHeader from './app/ui/components/ListHeader';
import Intro from './app/ui/views/Intro';
import ListItem, {IItemListItem} from './app/ui/components/ListItem';
import NewItemDialog from './app/ui/components/NewItemDialog';

interface IItem {
  id: number;
  title: string;
  data: {
    title: string;
    timeId: number;
  }[];
}

interface ISelectedHour {
  id: number;
  title: string;
}

const mockItems = [
  {id: 1, title: '00:00', data: []},
  {id: 2, title: '01:00', data: [{title: 'Café da manhã', timeId: 2}]},
  {id: 3, title: '16:00', data: [{title: 'Café da tarde', timeId: 3}]},
  {id: 4, title: '20:00', data: [{title: 'Jantar', timeId: 4}]},
];

const App = () => {
  const [isOpen, showOpen] = useState(false);
  const [items, setItems] = useState<IItem[]>(mockItems);
  const [selectedHour, setSelectedHour] = useState<ISelectedHour>({
    id: 1,
    title: '',
  });
  const [isOpenDialog, showOpenDialog] = useState(false);

  function onOpen() {
    showOpen(true);
  }

  function onNewItem(title: string) {
    const newItem: IItemListItem = {
      timeId: selectedHour.id,
      title: title,
    };

    const newItems = items.map((item) => {
      if (newItem.timeId === item.id) {
        item.data = [...item.data, newItem];
      }
      return item;
    });

    setItems(newItems);
  }

  function onRemove(itemToRemove: IItemListItem) {
    const newItems = items.map((item) => {
      if (itemToRemove.timeId === item.id) {
        item.data = item.data.filter(
          (data) => data.title !== itemToRemove.title,
        );
      }
      return item;
    });

    setItems(newItems);
  }

  function selectHour(newSelectedHour: ISelectedHour) {
    setSelectedHour(newSelectedHour);
    showOpenDialog(true);
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <SectionList
          sections={items}
          keyExtractor={(item) => item.title}
          renderSectionHeader={({section}) => (
            <ListHeader onPress={selectHour} item={section as IItem} />
          )}
          renderItem={({item}) => <ListItem item={item} onRemove={onRemove} />}
          stickySectionHeadersEnabled={true}
        />

        <NewItemDialog
          isDialogOpen={isOpenDialog}
          showDialogOpen={showOpenDialog}
          onNewItem={onNewItem}
          selectedHour={selectedHour}
        />

        {!isOpen && <Intro onOpen={onOpen} />}
      </SafeAreaView>
    </>
  );
};

export default App;
