import { useClipboard } from '@mantine/hooks';
import type { SpotlightAction } from '@mantine/spotlight';
import { SpotlightProvider } from '@mantine/spotlight';
import { useCurrentSession } from 'hooks/api/session';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useProviders } from 'hooks/providers';
import { useCreateEventCheck } from 'hooks/use-create-event-check';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import {
  Confetti,
  DiscordLogo,
  GithubLogo,
  GoogleLogo,
  IconProps,
  Link,
  MagnifyingGlass,
  Moon,
  PlusCircle,
  Queue,
  SignIn,
  SignOut,
  SquaresFour,
  Sun,
  User,
} from 'phosphor-react';

const useSpotlightActions = () => {
  const router = useRouter();
  const { toggleColorScheme, isDark } = useAppColorscheme();
  const { isAuthenticated, isLoading } = useCurrentSession();
  const { signInWithProvider } = useProviders();
  const { navigateToCreateEvent } = useCreateEventCheck();
  const clipboard = useClipboard();

  const iconProps: IconProps = {
    size: 24,
    weight: 'duotone',
  };

  const routeActions: SpotlightAction[] = [
    {
      title: 'Dashboard',
      group: 'Navigate',
      description: 'Go to your dashboard',
      onTrigger: () => router.push(paths.home()),
      icon: <SquaresFour {...iconProps} />,
      keywords: ['home'],
    },
    // {
    //   title: 'Explore',
    //   group: 'Navigate',
    //   description: 'Go to your explore page',
    //   onTrigger: () => router.push(paths.explore()),
    //   icon: <Binoculars {...iconProps} />,
    // },
    {
      title: 'Events',
      group: 'Navigate',
      description: 'Go to your events events',
      onTrigger: () => router.push(paths.events()),
      icon: <Confetti {...iconProps} />,
    },
    {
      title: 'Quizzes',
      group: 'Navigate',
      description: 'Go to your quizzes',
      onTrigger: () => router.push(paths.quiz()),
      icon: <Queue {...iconProps} />,
    },
    {
      title: 'Profile',
      group: 'Navigate',
      description: 'Go to your profile',
      onTrigger: () => router.push(paths.profile()),
      icon: <User {...iconProps} />,
    },
  ];

  const authRouteActions: SpotlightAction[] = [
    {
      title: 'Create event',
      group: 'Navigate',
      description: 'Create a new event',
      onTrigger: navigateToCreateEvent,
      icon: <PlusCircle {...iconProps} />,
    },
  ];

  const signinProviderActions: SpotlightAction[] = [
    {
      title: 'Sign in',
      description: 'Sign in to your account',
      group: 'Actions',
      onTrigger: () => router.push(paths.signIn()),
      icon: <SignIn {...iconProps} />,
      keywords: ['login', 'auth'],
    },
    {
      title: 'Sign in with Google',
      group: 'Auth',
      description: 'Sign in with your Google account',
      onTrigger: () => signInWithProvider('google', '/'),
      icon: <GoogleLogo size={24} weight="bold" />,
    },
    {
      title: 'Sign in with Github',
      group: 'Auth',
      description: 'Sign in with your Github account',
      onTrigger: () => signInWithProvider('github', '/'),
      icon: <GithubLogo {...iconProps} />,
    },
    {
      title: 'Sign in with Discord',
      group: 'Auth',
      description: 'Sign in with your Discord account',
      onTrigger: () => signInWithProvider('discord', '/'),
      icon: <DiscordLogo {...iconProps} />,
    },
  ];

  const authActions: SpotlightAction[] = [
    {
      title: 'Sign out',
      description: 'Sign out of your account',
      group: 'Actions',
      onTrigger: () =>
        signOut({
          callbackUrl: '/signin?signOut=true',
        }),
      icon: <SignOut {...iconProps} />,
      keywords: ['logout', 'log out', 'signout'],
    },
  ];

  // TODO: configure showing auth vs non-auth options
  const generalActions: SpotlightAction[] = [
    {
      title: 'Switch theme',
      description: `Switch to ${isDark ? 'light' : 'dark'} mode`,
      group: 'Actions',
      onTrigger: () => toggleColorScheme(),
      icon: isDark ? <Sun {...iconProps} /> : <Moon {...iconProps} />,
      keywords: ['theme', 'mode', 'dark', 'light', 'toggle'],
    },
    {
      title: 'Share link',
      description: `Copy link to current page`,
      group: 'Actions',
      onTrigger: () => clipboard.copy(window?.location.href),
      icon: <Link {...iconProps} />,
      keywords: ['link', 'clipboard', 'share'],
    },
  ];

  const ACTIONS: SpotlightAction[] = [...generalActions];

  if (isLoading) {
    // TODO
  } else if (isAuthenticated) {
    // TODO: check route actions per role
    ACTIONS.push(...routeActions);
    ACTIONS.push(...authActions);
    // TODO: add permissions as in list items, but both should be reactive
    ACTIONS.push(...authRouteActions);
  } else {
    ACTIONS.push(...routeActions);
    ACTIONS.push(...signinProviderActions);
  }

  return ACTIONS;
};

export const CustomSpotlightProvider = ({ children }) => {
  const actions = useSpotlightActions();

  return (
    // TODO: only allow providers on spotlight for /signin page
    <SpotlightProvider
      actions={actions}
      searchIcon={<MagnifyingGlass size={24} />}
      searchPlaceholder="Search..."
      shortcut={['mod + P', 'mod + K', '/']}
      nothingFoundMessage="Nothing found..."
      highlightQuery
      highlightColor="orange"
      styles={{
        root: {
          padding: '0.5rem',
        },
      }}
    >
      {children}
    </SpotlightProvider>
  );
};
