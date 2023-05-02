import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CSS from 'csstype'
import { SxProps } from '@mui/material/styles';

interface ITyleType {
    name: string,
    color: CSS.Property.Color | string,
}

const DEFAULT_TILES: ITyleType[] =
    [
        { name: "water", color: "blue" },
        { name: "land", color: "green" },
        { name: "forest", color: "darkgreen" },
    ];

function Tile({ tile, pos, size: { width, height } }: {
    tile: number,
    pos: { x: number, y: number },
    size: any,
}) {

    let style: SxProps = {
        width: `${width}px`,
        height: `${height}px`,
        position: "absolute",
        top: `${(width * pos.x)}px`,
        left: `${(height * pos.y)}px`,
        backgroundColor: DEFAULT_TILES[tile].color,
    };

    return (<>
        <Box sx={style}></Box>
    </>)
}

interface IMap {
    width?: number,
    height?: number,
    tileSize?: {
        width?: number,
        height?: number,
    },
    tilemap: Array<Array<number>>,
}

const map: IMap = {
    width: 20,
    height: 20,
    tileSize: {
        width: 40,
        height: 40,
    },
    tilemap: [
        [1, 0, 1, 2, 2, 1, 0, 2, 1, 0, 0, 1, 1, 1, 2, 2, 1, 0, 1, 1],
        [2, 1, 0, 2, 0, 2, 0, 2, 2, 0, 0, 1, 1, 1, 2, 0, 0, 0, 1, 2],
        [1, 2, 1, 2, 2, 1, 2, 0, 2, 2, 0, 0, 0, 0, 1, 2, 2, 0, 1, 2],
        [1, 0, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 0, 2, 1, 0, 2, 0, 0, 1],
        [1, 2, 1, 1, 0, 0, 0, 2, 0, 0, 2, 1, 2, 1, 1, 2, 2, 1, 0, 0],
        [1, 0, 1, 2, 2, 1, 0, 2, 1, 0, 0, 1, 1, 1, 2, 2, 1, 0, 1, 1],
        [2, 1, 0, 2, 0, 2, 0, 2, 2, 0, 0, 1, 1, 1, 2, 0, 0, 0, 1, 2],
        [1, 2, 1, 2, 2, 1, 2, 0, 2, 2, 0, 0, 0, 0, 1, 2, 2, 0, 1, 2],
        [1, 0, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 0, 2, 1, 0, 2, 0, 0, 1],
        [1, 2, 1, 1, 0, 0, 0, 2, 0, 0, 2, 1, 2, 1, 1, 2, 2, 1, 0, 0],
        [1, 0, 1, 2, 2, 1, 0, 2, 1, 0, 0, 1, 1, 1, 2, 2, 1, 0, 1, 1],
        [2, 1, 0, 2, 0, 2, 0, 2, 2, 0, 0, 1, 1, 1, 2, 0, 0, 0, 1, 2],
        [1, 2, 1, 2, 2, 1, 2, 0, 2, 2, 0, 0, 0, 0, 1, 2, 2, 0, 1, 2],
        [1, 0, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 0, 2, 1, 0, 2, 0, 0, 1],
        [1, 2, 1, 1, 0, 0, 0, 2, 0, 0, 2, 1, 2, 1, 1, 2, 2, 1, 0, 0],
        [1, 0, 1, 2, 2, 1, 0, 2, 1, 0, 0, 1, 1, 1, 2, 2, 1, 0, 1, 1],
        [2, 1, 0, 2, 0, 2, 0, 2, 2, 0, 0, 1, 1, 1, 2, 0, 0, 0, 1, 2],
        [1, 2, 1, 2, 2, 1, 2, 0, 2, 2, 0, 0, 0, 0, 1, 2, 2, 0, 1, 2],
        [1, 0, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 0, 2, 1, 0, 2, 0, 0, 1],
        [1, 2, 1, 1, 0, 0, 0, 2, 0, 0, 2, 1, 2, 1, 1, 2, 2, 1, 0, 0],
    ]
}

export default function GameMap() {
    const [worldMap, setWorldMap] = useState<IMap>({ tilemap: [[]] });
    const [tiles, setTiles] = useState([]);

    useEffect(() => {
        setWorldMap(map);
    }, []);
    useEffect(() => {
        function renderTiles() {
            let tileList: any;
            if (worldMap) {
                tileList = worldMap!.tilemap.map((row, x) => {
                    return row.map((tile, y) => {
                        return <Tile tile={tile} pos={{ x, y }} size={worldMap.tileSize}></Tile>
                    })
                })
            }
            setTiles(tileList);
        }
        renderTiles();
        console.log(worldMap);
    }, [worldMap])
    return (
        <Box sx={{ width: "100%", height: "100%", overflow: "scroll", position: "relative" }}>
            {tiles}
        </Box>
    )
}