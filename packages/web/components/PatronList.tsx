import { SimpleGrid } from '@metafam/ds';
import { PatronTile } from 'components/Patron/PatronTile';
import { Patron } from 'graphql/types';
import React from 'react';

type Props = {
  patrons: Array<Patron>;
};

export const PatronList: React.FC<Props> = ({ patrons }) => (
  <SimpleGrid
    columns={[1, null, 2, 3]}
    spacing="8"
    autoRows="minmax(30rem, auto)"
  >
    {patrons.map((p) => (
      <PatronTile key={p.id} patron={p} />
    ))}
  </SimpleGrid>
);
