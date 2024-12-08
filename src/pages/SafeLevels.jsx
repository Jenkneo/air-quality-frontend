import React from 'react';
import styled from 'styled-components';

const SafeLevelsContainer = styled.div`
  padding: 20px;
  margin-bottom: 60px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`;

const TableHeader = styled.th`
  background-color: #4CAF50;
  color: white;
  padding: 12px 15px;
  text-align: left;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px 12px;
  text-align: left;
  font-size: 14px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`;

const SafeLevels = () => (
  <SafeLevelsContainer>
    <h2>Предельно допустимые концентрации (ПДК) и рекомендации для разных групп людей</h2>
    <p>Информация о ПДК загрязняющих веществ в воздухе и рекомендации для людей с различными заболеваниями.</p>
    
    <h3>Таблица ПДК загрязняющих веществ в воздухе</h3>
    <Table>
      <thead>
        <tr>
          <TableHeader>Вещество</TableHeader>
          <TableHeader>ПДК для здоровых людей (мкг/м³)</TableHeader>
          <TableHeader>ПДК для людей с заболеваниями дыхательных путей (мкг/м³)</TableHeader>
          <TableHeader>ПДК для людей с заболеваниями сердца (мкг/м³)</TableHeader>
          <TableHeader>Рекомендации</TableHeader>
        </tr>
      </thead>
      <tbody>
        <TableRow>
          <TableCell>CO (угарный газ)</TableCell>
          <TableCell>5000</TableCell>
          <TableCell>3000</TableCell>
          <TableCell>3000</TableCell>
          <TableCell>Избегать длительного пребывания на улице при высоких уровнях.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>NO₂ (диоксид азота)</TableCell>
          <TableCell>200</TableCell>
          <TableCell>100</TableCell>
          <TableCell>150</TableCell>
          <TableCell>Людям с заболеваниями дыхательных путей следует избегать выхода на улицу при высоком уровне.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>O₃ (озон)</TableCell>
          <TableCell>160</TableCell>
          <TableCell>100</TableCell>
          <TableCell>140</TableCell>
          <TableCell>Беречься от высоких уровней озона при физических нагрузках на улице.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>SO₂ (диоксид серы)</TableCell>
          <TableCell>500</TableCell>
          <TableCell>250</TableCell>
          <TableCell>400</TableCell>
          <TableCell>Людям с заболеваниями дыхательных путей следует избегать выхода на улицу.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>PM10 (частицы размером до 10 мкм)</TableCell>
          <TableCell>150</TableCell>
          <TableCell>100</TableCell>
          <TableCell>150</TableCell>
          <TableCell>При высоком уровне загрязнения следует оставаться в помещениях.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>PM2.5 (мелкие частицы размером до 2.5 мкм)</TableCell>
          <TableCell>25</TableCell>
          <TableCell>10</TableCell>
          <TableCell>15</TableCell>
          <TableCell>Рекомендуется избегать физической активности на улице при высоких уровнях.</TableCell>
        </TableRow>
      </tbody>
    </Table>

    <h3>Оценка качества воздуха (AQI) по шкале OpenWeather</h3>
    <p>Шкала AQI OpenWeather определяет уровень загрязнения и риски для здоровья на основе концентрации загрязняющих веществ. Приводим интервалы для различных загрязнителей и их связь с AQI:</p>
    
    <Table>
      <thead>
        <tr>
          <TableHeader>Уровень качества воздуха (AQI)</TableHeader>
          <TableHeader>Концентрация загрязняющих веществ (мкг/м³)</TableHeader>
          <TableHeader>CO</TableHeader>
          <TableHeader>NO₂</TableHeader>
          <TableHeader>O₃</TableHeader>
          <TableHeader>SO₂</TableHeader>
          <TableHeader>PM10</TableHeader>
          <TableHeader>PM2.5</TableHeader>
        </tr>
      </thead>
      <tbody>
        <TableRow>
          <TableCell>Хорошее (1)</TableCell>
          <TableCell>[0; 20)</TableCell>
          <TableCell>[0; 4400)</TableCell>
          <TableCell>[0; 40)</TableCell>
          <TableCell>[0; 60)</TableCell>
          <TableCell>[0; 20)</TableCell>
          <TableCell>[0; 10)</TableCell>
          <TableCell>[0; 20)</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Умеренное (2)</TableCell>
          <TableCell>[20; 80)</TableCell>
          <TableCell>[4400; 9400)</TableCell>
          <TableCell>[40; 70)</TableCell>
          <TableCell>[60; 100)</TableCell>
          <TableCell>[20; 50)</TableCell>
          <TableCell>[10; 25)</TableCell>
          <TableCell>[20; 50)</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Умеренное (3)</TableCell>
          <TableCell>[80; 250)</TableCell>
          <TableCell>[9400; 12400)</TableCell>
          <TableCell>[70; 150)</TableCell>
          <TableCell>[100; 140)</TableCell>
          <TableCell>[50; 100)</TableCell>
          <TableCell>[25; 50)</TableCell>
          <TableCell>[50; 100)</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Плохое (4)</TableCell>
          <TableCell>[250; 350)</TableCell>
          <TableCell>[12400; 15400)</TableCell>
          <TableCell>[150; 200)</TableCell>
          <TableCell>[140; 180)</TableCell>
          <TableCell>[75; 150)</TableCell>
          <TableCell>[50; 75)</TableCell>
          <TableCell>[100; 200)</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Очень плохое (5)</TableCell>
          <TableCell>⩾350</TableCell>
          <TableCell>⩾15400</TableCell>
          <TableCell>⩾200</TableCell>
          <TableCell>⩾180</TableCell>
          <TableCell>⩾150</TableCell>
          <TableCell>⩾75</TableCell>
          <TableCell>⩾200</TableCell>
        </TableRow>
      </tbody>
    </Table>
  </SafeLevelsContainer>
);

export default SafeLevels;
