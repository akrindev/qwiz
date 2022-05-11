import { useState } from 'react';
import { Reorder } from 'framer-motion';
import { Text, Box, createStyles, Navbar } from '@mantine/core';
import { Plus } from 'phosphor-react';
import { ThinScrollArea } from 'components/UI/ThinScrollArea';
import { useRouter } from 'next/router';
import { questions } from 'mock/questions';
import cn from 'classnames';

export const Slides = () => {
  const [items, setItems] = useState(questions);
  const { classes } = useStyles();

  const router = useRouter();
  const { quizId, questionId } = router.query;

  const handleClick = (selectedQuestionId: string) => {
    router.push(`/quiz/${quizId}/${selectedQuestionId}`, undefined, {
      shallow: true,
    });
  };

  return (
    <Navbar.Section grow component={ThinScrollArea} className={classes.wrapper}>
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        style={{ padding: 0, marginBottom: 56 }}
      >
        {items.map((item) => (
          <Reorder.Item
            key={item.id}
            value={item}
            style={{ listStyle: 'none' }}
          >
            <Box
              className={cn(
                classes.box,
                questionId === item.id && classes.selected
              )}
              onClick={() => handleClick(item.id)}
            >
              <div>
                <Text color="dimmed" size="sm">
                  {item.question}
                </Text>
              </div>
            </Box>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <Box className={classes.addNew}>
        <Plus />
        <Text ml={8}>New Question</Text>
      </Box>
    </Navbar.Section>
  );
};

const useStyles = createStyles((theme) => ({
  box: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    textAlign: 'center',
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    margin: theme.radius.md,
    cursor: 'pointer',
    borderColor: 'transparent',
    borderWidth: 2,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
  },

  selected: {
    borderColor:
      theme.colorScheme === 'dark'
        ? theme.colors.blue[5]
        : theme.colors.blue[2],
    borderWidth: 2,
  },

  addNew: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    width: 200,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    padding: theme.spacing.sm,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
    cursor: 'pointer',
  },

  wrapper: {
    position: 'relative',
  },
}));
