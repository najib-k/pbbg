import React, { forwardRef, useEffect } from 'react';
import ItemDetails from './ItemDetails';
import useSWR from 'swr';
import { useInventory } from '../api/apiHooks';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { bindPopper } from 'material-ui-popup-state';
import Box from '@mui/material/Box';
import { backgroundGradient, itemDefaults, styles, textGradient } from './itemConstant';
import { SxProps } from '@mui/material';
import { bindHover, usePopupState } from 'material-ui-popup-state/hooks';
import { actionEquipPOST } from '../api/apiCall';

const test = {
  name: 'Blessed',
  affixes: [
    {
      mod: {
        health: { kw: 0, op: '+', value: 4294.131155813115 },
        defense: { kw: 0, op: '+', value: 261.491762 }
      }
    },
    {
      name: 'attack',
      mod: { attack: { op: '+', value: 989.5 } },
      rarity: 3
    },
    {
      name: 'health',
      mod: { health: { op: '+', value: 8708.344135168203 } },
      rarity: 4
    },
    { name: 'chd', mod: { chd: { op: '*', value: 222.5 } }, rarity: 7 },
    {
      name: 'attack',
      mod: { attack: { op: '+', value: 989.5 } },
      rarity: 2
    },
    {
      name: 'attack',
      mod: { attack: { op: '+', value: 989.5 } },
      rarity: 7
    }
  ],
  mod: { repair: 5.7, stat: 19.6 },
  rarity: 6,
  lvl: 100,
  keywords: [
    { name: 'bow', type: 3 },
    { name: 'Devastato', type: 0 },
    { name: 'Dragon', type: 0 },
    { name: 'HighFlame', type: 0 }
  ],
  quality: { name: 'D', mod: 2.5 }
}

const ItemPopover = forwardRef(function ItemPopover({ item, x, y }: any, ref) {
  const [rarity, setRarity] = React.useState(0);
  item.rarity = rarity;
/*   useEffect(() => {
    const i = setInterval(() => setRarity((old) => old >= 8 ? 0 : old + 1), 500);

    return () => {
      clearInterval(i);
    }
  }, []) */
  let popupState = usePopupState({ variant: 'popper', popupId: `item-${item.id}` });
  let r = styles.r[item.rarity] || styles.r[0];
  let style: SxProps = {
    width: `${itemDefaults.width}px`,
    height: `${itemDefaults.height}px`,
    position: "absolute",
    top: `${(itemDefaults.height * y)}px`,
    left: `${(itemDefaults.width * x)}px`,
    border: 1,
    borderColor: "blue",
    fontSizeAdjust: "auto",
    ...(r.gradient ? backgroundGradient(r.bg) : { backgroundColor: r.bg }),
  };

  const textInvert: SxProps = {
    filter: "invert(1)",
    mixBlendMode: "difference",
};

  const handleEquip = () => {
    actionEquipPOST(item.id);
  }

  return (<>
  <Box sx={style} textAlign={"center"} {...bindHover(popupState)} onClick={handleEquip}>
    {item.equipped && <Box sx={{backgroundColor: "green", color: "white", position: 'relative', float: 'right', width: '16px', height:'16px'}} textAlign={'center'}></Box>}
    <Typography sx={textInvert} variant="body1">
      {item.quality.name}
    </Typography>
    <Typography variant="body1" sx={textInvert}  fontSize={"0.8em"} justifyContent={'center'}>
      {item.type}
    </Typography>
  </Box>
  <Popper className='keepScale' {...bindPopper(popupState)} transition>
    {({ TransitionProps }) => (
      <Fade {...TransitionProps} timeout={100} style={{ transitionDelay: "100ms" }}>
        <Paper> <ItemDetails data={item} /></Paper>
      </Fade>
    )}
  </Popper>
</>)
})


export default function Test() {
  const {inventory: data, error} = useInventory();
  const lineSize = 5;

  return (<>
    <Box sx={{ width: "100%", height: "100%" }}>
      {data?.uuids && data.uuids.map((item, idx) => {
        let x = idx % lineSize;
        let y = Math.floor(idx / lineSize);

        return <ItemPopover key={item.id} x={x} y={y} item={item} />
      })}
    </Box>
  </>)
}