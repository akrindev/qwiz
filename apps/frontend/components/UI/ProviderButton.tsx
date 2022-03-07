import { Box, Group, Text } from '@mantine/core';
import { DiscordLogo, GithubLogo, GoogleLogo, IconProps } from 'phosphor-react';
import React from 'react';

import { Button } from './Button/Button';

export type ProviderId = 'discord' | 'google' | 'github';

interface Props {
  id: ProviderId;
  name: string;
  onClick: (id: ProviderId) => void;
}

interface ProviderStyleProps {
  id: ProviderId;
}

type ProviderStylesModel = Record<ProviderId, ProviderStyleModel>;

interface ProviderStyleModel {
  color: string;
  icon: React.ReactNode;
}

const useProviderStyles = ({ id }: ProviderStyleProps) => {
  const { weight, size }: IconProps = {
    weight: 'duotone',
    size: 22,
  };
  const providers: ProviderStylesModel = {
    google: {
      color: '#4285f4',
      icon: <GoogleLogo size={size} weight="bold" />,
    },
    github: {
      color: '#171515',
      icon: <GithubLogo size={size} weight={weight} />,
    },
    discord: {
      color: '#5865F2',
      icon: <DiscordLogo size={size} weight={weight} />,
    },
  };

  const provider = providers[id];

  return { provider };
};

const ProviderButton = ({ id, name, onClick }: Props) => {
  const { provider } = useProviderStyles({ id });
  const { icon } = provider;

  return (
    <Button
      onClick={() => onClick(id)}
      variant="light"
      size="lg"
      radius="sm"
      sx={(t) => ({
        width: '100%',
      })}
      styles={{ inner: { justifyContent: 'flex-start' } }}
    >
      <Group spacing={12} position="left">
        {icon}
        <Box>
          <Text size="md" weight={500} component="p">
            Continue with <span>{name}</span>
          </Text>
        </Box>
      </Group>
    </Button>
  );
};

export default ProviderButton;
