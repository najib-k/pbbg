import { Box, Chip, Divider, Grid, Paper, SxProps, Typography } from '@mui/material';
import { useState, Fragment } from 'react';
import { styles, textGradient } from './itemConstant';

type ModOperator = string | '*' | '-' | '/' | '+';

type baseStat = "health" | "attack" | "defense" | "chc" | "chd";

interface StatMod {
    kw?: number,
    value: number,
    op: ModOperator,
}

interface Affix {
    mod: {
        [key: string]: StatMod | any;
    },
    name?: string,
    rarity?: number,
}

interface ItemData {
    name: string,
    rarity: number,
    lvl: number,
    keywords: any[],
    mod: {
        repair: number,
        stat: number
    }
    affixes: Affix[],
    quality: {
        name: string,
        mod: number,
    },
    [key: string]: any,
}

const OpToString = {
    '*': (stat, value) =>  {if (typeof value !== "number") value = parseFloat(value); return `Multiplies ${stat} by ${(value / 100).toFixed(2)}`},
    '/': (stat, value) =>  {if (typeof value !== "number") value = parseFloat(value); return `Divides ${stat} by ${value.toFixed(2)}`},
    '+': (stat, value) =>  {if (typeof value !== "number") value = parseFloat(value); return `Increase ${stat} by ${value.toFixed(2)}`},
    '-': (stat, value) =>  {if (typeof value !== "number") value = parseFloat(value); return `Decrease ${stat} by ${value.toFixed(2)}`},
}

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse condimentum urna nec libero tempus rhoncus. Sed sit amet lacinia mi. Duis tincidunt placerat tortor non feugiat. Ut tortor risus, commodo quis hendrerit vitae, mattis id augue. Ut non eros luctus, tempor mauris nec, pretium nulla"

function AffixDetails({ affix }) {
    console.log(affix)
    return (
        <>
            {Object.keys(affix.mod).map((stat, idx) => {
                let {kw = -1, op, value} = affix.mod[stat];
                console.log(stat)
                return (<Typography key={`${stat}${op}${value}${kw}`} variant='body2'>
                    {`\t• ${OpToString[op](stat, value)}`}
                </Typography>)
                })
            }
        </>
    )
}

export default function ItemDetails({ data }: { data: ItemData }) {
    let r = styles.r[data.rarity];
    return (
            <Box component={Paper} sx={{ color: 'white', background: 'black', opacity: '.8', maxWidth: "500px", maxHeight: "700px", overflow: "auto" }}>
                <Grid container>
                    <Grid container item alignItems='center' spacing={1}>
                        <Grid container item >
                            <Typography variant='h6' sx={r?.gradient ? textGradient(r.bg) : { color: r.bg }}>
                                [{r.name}]
                            </Typography>
                            <Typography variant='h4'>
                                {data.keywords[0].name}
                            </Typography>

                            {data.keywords.map((kw, idx) =>

                                <Chip
                                    key={"" + kw.name + idx}
                                    clickable
                                    label={`• ${kw.name}`}
                                    size="small"
                                    variant="filled"
                                    sx={styles.kws[kw.name] || styles.kws.default}
                                />

                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                
                {data.affixes.map((aff, idx) => {
                    let affR = styles.r[aff?.rarity || 0];
                    return( 
                        <Grid key={`${aff.name} ${idx}`} container item>
                            

                            <Typography variant='body1' sx={affR?.gradient ? textGradient(affR?.bg) : { color: affR.bg }}>
                                {aff.name}
                                <AffixDetails affix={aff} />
                            </Typography>

                            {(idx === 0) ?
                        null : <Divider variant="middle"></Divider>}
                        </Grid>
                        )
                })}
                </Grid>
            </Box>
    )
}