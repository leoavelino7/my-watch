import React, {useState} from 'react';
import {SectionList, StatusBar, Animated, Dimensions} from 'react-native';
import ListHeader from './app/ui/components/ListHeader';
import Intro from './app/ui/views/Intro';
import ListItem, {IItemListItem} from './app/ui/components/ListItem';
import NewItemDialog from './app/ui/components/NewItemDialog';
import Day from './app/ui/components/Day';

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

const HEIGHT_DAY = 100;

const mockItems = [
  {id: 1, title: '00:00', data: []},
  {id: 2, title: '01:00', data: [{title: 'Café da manhã', timeId: 2}]},
  {id: 3, title: '02:00', data: [{title: 'Café da tarde', timeId: 3}]},
  {id: 4, title: '03:00', data: []},
  {id: 5, title: '04:00', data: []},
  {id: 6, title: '05:00', data: []},
  {id: 7, title: '06:00', data: []},
  {id: 8, title: '07:00', data: []},
  {id: 9, title: '08:00', data: []},
  {id: 10, title: '09:00', data: []},
  {id: 11, title: '10:00', data: []},
  {id: 12, title: '11:00', data: []},
  {id: 13, title: '12:00', data: []},
  {id: 14, title: '13:00', data: []},
  {id: 15, title: '14:00', data: []},
  {id: 16, title: '15:00', data: []},
  {id: 17, title: '16:00', data: []},
  {id: 18, title: '17:00', data: []},
  {id: 19, title: '18:00', data: []},
  {id: 20, title: '19:00', data: []},
  {id: 21, title: '20:00', data: []},
  {id: 22, title: '21:00', data: []},
  {id: 23, title: '22:00', data: []},
  {id: 24, title: '23:00', data: []},
];

const App = () => {
  const [isOpen, showOpen] = useState(false);
  const [items, setItems] = useState<IItem[]>(mockItems);
  const [selectedHour, setSelectedHour] = useState<ISelectedHour>({
    id: 1,
    title: '',
  });
  const [isOpenDialog, showOpenDialog] = useState(false);
  const [pageHeight, setPageHeight] = useState(100);

  const scrollY = new Animated.Value(0);

  function onOpen() {
    showOpen(true);
  }

  function closeScreen() {
    showOpen(false);
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

  function onContentSizeChange(scrollWidth: number, scrollHeight: number) {
    const newPageHeight = Math.abs(
      Dimensions.get('screen').height - scrollHeight - HEIGHT_DAY,
    );
    setPageHeight(newPageHeight);
  }

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: false,
    },
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Day onPress={closeScreen} scrollY={scrollY} pageHeight={pageHeight} />
      <SectionList
        sections={items}
        keyExtractor={(item) => item.title}
        renderSectionHeader={({section}) => (
          <ListHeader onPress={selectHour} item={section as IItem} />
        )}
        renderItem={({item}) => <ListItem item={item} onRemove={onRemove} />}
        stickySectionHeadersEnabled={true}
        onScroll={handleScroll}
        onContentSizeChange={onContentSizeChange}
      />

      <NewItemDialog
        isDialogOpen={isOpenDialog}
        showDialogOpen={showOpenDialog}
        onNewItem={onNewItem}
        selectedHour={selectedHour}
      />
      {!isOpen && <Intro onOpen={onOpen} />}
    </>
  );
};

export default App;
