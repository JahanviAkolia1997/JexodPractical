import React, { useState } from 'react';
import { actualVersion, budgetVersion, usdCurrency, euroVersion } from './data'; // Importing the data from data.ts
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Switch from '@mui/material/Switch';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface columnValue {
  id: number;
  name: string;
  children?: columnValue[];
}

const tableColumn: columnValue[] = [
  {
    id: 1,
    name: 'Europe',
    children: [
      {
        id: 2,
        name: 'Germany',
        children: [
          {
            id: 4,
            name: 'Freiburg',
          },
          {
            id: 5,
            name: 'Berlin'
          }
        ]
      },
      {
        id: 3,
        name: 'Great Britain',
      }
    ]
  }
];
interface ChildData {
  id: number;
  name: string;
  colValue: any;
  rowData: any;
  legalEntiry: number;
  version: string;
  currency: string;
  children?: ChildData[];
}
interface DataItem {
  id: number;
  name: string;
  colValue: any;
  rowData: any;
  legalEntiry: number;
  version: string;
  currency: string;
  children?: ChildData[];
}

const initialData: DataItem[] = [
  {
    id: 1,
    name: 'All Articles',
    colValue: { col1: 'Units', col2: 'Unit Price', col3: 'Gross Revenue' },
    rowData: { europe: 59.37, germany: 10.33, freiburg: 3.2132, berlin: 3423.34, greatbritain: 23.33 },
    legalEntiry: 11,
    version: 'actual',
    currency: 'USD',
    children: [
      {
        id: 2,
        name: 'Bikes',
        colValue: { col1: 'Units', col2: 'Unit Price', col3: 'Gross Revenue' },
        rowData: { europe: 59.37, germany: 10.33, freiburg: 3.2132, berlin: 3423.34, greatbritain: 23.33 },
        legalEntiry: 17,
        version: 'actual',
        currency: 'euro',
        children: [
          {
            id: 4,
            name: 'Mountain Bikes',
            colValue: { col1: 'Units', col2: 'Unit Price', col3: 'Gross Revenue' },
            rowData: { europe: 59.37, germany: 10.33, freiburg: 3.2132, berlin: 3423.34, greatbritain: 23.33 },
            legalEntiry: 15,
            version: 'budget',
            currency: 'USD',
          },
          {
            id: 5,
            name: 'Road Bikes',
            colValue: { col1: 'Units', col2: 'Unit Price', col3: 'Gross Revenue' },
            rowData: { europe: 59.37, germany: 10.33, freiburg: 3.2132, berlin: 3423.34, greatbritain: 23.33 },
            legalEntiry: 19,
            version: 'actual',
            currency: 'euro',
          },
          {
            id: 6,
            name: 'Touring Bikes',
            colValue: { col1: 'Units', col2: 'Unit Price', col3: 'Gross Revenue' },
            rowData: { europe: 59.37, germany: 10.33, freiburg: 3.2132, berlin: 3423.34, greatbritain: 23.33 },
            legalEntiry: 11,
            version: 'budget',
            currency: 'USD',
          }]
      },
      {
        id: 3,
        name: 'Complementary Products',
        colValue: { col1: 'Units', col2: 'Unit Price', col3: 'Gross Revenue' },
        rowData: { europe: 59.37, germany: 10.33, freiburg: 3.2132, berlin: 3423.34, greatbritain: 23.33 },
        legalEntiry: 19,
        version: 'actual',
        currency: 'euro',
        children: [
          {
            id: 7,
            name: 'Subscription',
            colValue: { col1: 'Units', col2: 'Unit Price', col3: 'Gross Revenue' },
            rowData: { europe: 59.37, germany: 10.33, freiburg: 3.2132, berlin: 3423.34, greatbritain: 23.33 },
            legalEntiry: 11,
            version: 'budget',
            currency: 'USD',
          }
        ]
      }
    ]
  },
  {
    id: 10,
    name: 'Publication',
    colValue: { col1: 'Units', col2: 'Unit Price', col3: 'Gross Revenue' },
    rowData: { europe: 59.37, germany: 10.33, freiburg: 3.2132, berlin: 3423.34, greatbritain: 23.33 },
    legalEntiry: 11,
    version: 'actual',
    currency: 'USD',
    children: [
      {
        id: 2,
        name: 'Books',
        colValue: { col1: 'Units', col2: 'Unit Price', col3: 'Gross Revenue' },
        rowData: { europe: 59.37, germany: 10.33, freiburg: 3.2132, berlin: 3423.34, greatbritain: 23.33 },
        legalEntiry: 11,
        version: 'actual',
        currency: 'USD',
      }
    ]
  }
];

const TreeTable: React.FC<{ data: DataItem[], tableColumn: columnValue[] }> = ({ data, tableColumn }) => {
  const [tableSampleData, setTableData] = useState<DataItem[]>(data);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [legalEntiry, setLegalEntiry] = useState('');
  const [version, setVersion] = useState('');
  const [currency, setCurrency] = useState('');

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  // FILTER LEGAL ENTITY DATA
  const filterDataByLegalEntity = (data: DataItem[], legalEntity: number): DataItem[] => {
    const filteredData: DataItem[] = [];

    const filterRecursive = (items: DataItem[] | ChildData[]) => {
      for (const item of items) {
        if (item.legalEntiry === legalEntity) {
          filteredData.push(item);
        }
        if (item.children) {
          filterRecursive(item.children);
        }
      }
    };

    filterRecursive(data);

    return filteredData;
  };
  const handlelegalEntiryChange = (event: SelectChangeEvent) => {
    setLegalEntiry(event.target.value);
    switch (event.target.value) {
      case 'default':
        setTableData(initialData);
        break;
      case '11':
      case '15':
      case '19':
        const filteredData = filterDataByLegalEntity(initialData, Number(event.target.value));
        setTableData(filteredData);
        break;
      default:
        setTableData(initialData)
    }
  };

  // FILTER VERSION DATA
  const handlelVersionChange = (event: SelectChangeEvent) => {
    setVersion(event.target.value);
    switch (event.target.value) {
      case 'actual':
        setTableData(actualVersion);
        break;
      case 'budget':
        setTableData(budgetVersion);
        break;
      default:
        setTableData(initialData)
    }
  };

  // FILTER CURRENCY DATA
  const handleCurrencyChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value);
    switch (event.target.value) {
      case 'USD':
        setTableData(usdCurrency);
        break;
      case 'euro':
        setTableData(euroVersion);
        break;
      default:
        setTableData(initialData)
    }
  };

  // CHANGE MODE 
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // EXPAND/COLLAPSE
  const toggleExpansion = (id: number) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((i) => i !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };
  const toggleExpand = (id: number) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(prevState => prevState.filter(item => item !== id));
    } else {
      setExpandedItems(prevState => [...prevState, id]);
    }
  };

  // RENDER TABLE DATA
  const renderRows = (items: DataItem[], level: string) => {
    return items.map((item) => (
      <React.Fragment key={item?.id}>
        <TableRow key={item.id}>
          <TableCell style={{ paddingLeft: level === 'child' ? '50px' : '' }}>
            {item.children ? (
              <>
                <IconButton onClick={() => toggleExpansion(item.id)}>
                  {expandedIds.includes(item.id) ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
                </IconButton>
                {item.name}{level}
              </>
            ) : (
              <span style={{ paddingLeft: '50px' }}>{item.name}</span>
            )}
          </TableCell>
          <TableCell>{item?.colValue?.col1 && item?.colValue?.col1}</TableCell>
          {(expandedItems.includes(1) || expandedItems.length === 0 || expandedItems.length === 1) && <TableCell>{item?.rowData?.europe && item?.rowData?.europe}</TableCell>}
          {expandedItems.includes(1) && <TableCell>{item?.rowData?.germany && item?.rowData?.germany}</TableCell>}
          {expandedItems.includes(1) && expandedItems.includes(2) && <TableCell>{item?.rowData?.freiburg && item?.rowData?.freiburg}</TableCell>}
          {expandedItems.includes(1) && expandedItems.includes(2) && <TableCell>{item?.rowData?.berlin && item?.rowData?.berlin}</TableCell>}
          {expandedItems.includes(1) && <TableCell>{item?.rowData?.greatbritain && item?.rowData?.greatbritain}</TableCell>}
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>{item?.colValue?.col2 && item?.colValue?.col2}</TableCell>
          {(expandedItems.includes(1) || expandedItems.length === 0 || expandedItems.length === 1) && <TableCell>{item?.rowData?.europe && item?.rowData?.europe}</TableCell>}
          {expandedItems.includes(1) && <TableCell>{item?.rowData?.germany && item?.rowData?.germany}</TableCell>}
          {expandedItems.includes(1) && expandedItems.includes(2) && <TableCell>{item?.rowData?.freiburg && item?.rowData?.freiburg}</TableCell>}
          {expandedItems.includes(1) && expandedItems.includes(2) && <TableCell>{item?.rowData?.berlin && item?.rowData?.berlin}</TableCell>}
          {expandedItems.includes(1) && <TableCell>{item?.rowData?.greatbritain && item?.rowData?.greatbritain}</TableCell>}
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>{item?.colValue?.col3 && item?.colValue?.col3}</TableCell>
          {(expandedItems.includes(1) || expandedItems.length === 0 || expandedItems.length === 1) && <TableCell>{item?.rowData?.europe && item?.rowData?.europe}</TableCell>}
          {expandedItems.includes(1) && <TableCell>{item?.rowData?.germany && item?.rowData?.germany}</TableCell>}
          {expandedItems.includes(1) && expandedItems.includes(2) && <TableCell>{item?.rowData?.freiburg && item?.rowData?.freiburg}</TableCell>}
          {expandedItems.includes(1) && expandedItems.includes(2) && <TableCell>{item?.rowData?.berlin && item?.rowData?.berlin}</TableCell>}
          {expandedItems.includes(1) && <TableCell>{item?.rowData?.greatbritain && item?.rowData?.greatbritain}</TableCell>}
        </TableRow>
        {
          expandedIds.includes(item.id) && item.children && (
            <>{renderRows(item.children, 'child')}</>
          )
        }
      </React.Fragment >
    ));
  };

  // RENDER COLUMN DATA
  const renderData = (items: columnValue[]) => {
    return items.map((item) => (
      <React.Fragment>
        <TableCell>
          {item.children ? (
            <>
              <IconButton onClick={() => toggleExpand(item.id)}>
                {expandedItems.includes(item.id) ? <KeyboardArrowLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
              {item.name}
            </>
          ) : (<>{item.name}</>)}
        </TableCell>
        {expandedItems.includes(item.id) && item.children && (
          <>{renderData(item.children)}</>
        )}
      </React.Fragment>
    ));
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <Brightness4Icon />
        <Switch checked={darkMode} onChange={toggleDarkMode} />
        <Brightness7Icon />
      </div>
      <div style={{ background: `${darkMode ? '#1e1e1e' : ''}` }}>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Legal Entity</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={legalEntiry}
            onChange={handlelegalEntiryChange}
            autoWidth
            label="Legal Entity"
          >
            <MenuItem value="default">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'11'}>11</MenuItem>
            <MenuItem value={'15'}>15</MenuItem>
            <MenuItem value={'19'}>19</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Version</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={version}
            onChange={handlelVersionChange}
            autoWidth
            label="Version"
          >
            <MenuItem>
              <em>None</em>
            </MenuItem>
            <MenuItem value='actual'>Actual</MenuItem>
            <MenuItem value='budget'>Budget</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Currency</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={currency}
            onChange={handleCurrencyChange}
            autoWidth
            label="Currency"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value='euro'>Euro</MenuItem>
            <MenuItem value='USD'>USD</MenuItem>
          </Select>
        </FormControl>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              {renderData(tableColumn)}
            </TableRow>
          </TableHead>
          <TableBody>{renderRows(tableSampleData, 'parent')}</TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <TreeTable data={initialData} tableColumn={tableColumn} />
    </div>
  );
};

export default App;
