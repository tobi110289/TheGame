import {
  Container,
  MetaBox,
  MetaTag,
  SimpleGrid,
  Text,
  Wrap,
} from '@metafam/ds';
import { PlayerFeatures } from 'components/Player/PlayerFeatures';
import { PlayerHero } from 'components/Player/PlayerHero';
import { getPlayer } from 'graphql/getPlayer';
import { getPlayers } from 'graphql/getPlayers';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Error from 'next/error';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PlayerPage: React.FC<Props> = ({ player }) => {
  if (!player) {
    return <Error statusCode={404} />;
  }

  const aboutMeText = player.box_profile?.description;

  return (
    <>
      <PlayerHero player={player} />
      <PlayerFeatures player={player} />
      <Container maxW="xl">
        <SimpleGrid columns={[1, 1, 2, 3]} spacing="8" pt="12">
          {aboutMeText ? (
            <MetaBox title="About me">
              <Text fontFamily="body">{player.box_profile?.description}</Text>
            </MetaBox>
          ) : null}
          <MetaBox title="Skills">
            <Text fontFamily="body" color="whiteAlpha.500">
              Unavailable
            </Text>
          </MetaBox>
          <MetaBox title="Memberships">
            <Wrap>
              {player.daohausMemberships.map((member) => (
                <MetaTag key={member.id} size="md" fontWeight="normal">
                  {member.moloch.title}
                </MetaTag>
              ))}
            </Wrap>
          </MetaBox>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default PlayerPage;

type QueryParams = { username: string };

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const players = await getPlayers();

  return {
    paths: players.map(({ username }) => ({
      params: { username },
    })),
    fallback: false,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<QueryParams>,
) => {
  const username = context.params?.username;
  const player = await getPlayer(username);

  return {
    props: {
      player,
    },
  };
};