import { Box, Button, createStyles, Group, Navbar, Stack } from '@mantine/core';
import { ThinScrollArea } from 'components/UI/ThinScrollArea';
import { Reorder } from 'framer-motion';
import { useQuiz } from 'hooks/api/quiz';
import { useSlideCreate } from 'hooks/api/slide';
import { useRouter } from 'next/router';
import { Plus } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { SlideWithQuestionAndElements } from 'types/slide';
import { SlidePreview } from './SlidePreview';

export const Slides = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const { quizId, slideId } = router.query;

  const { data: quiz, isSuccess } = useQuiz(quizId as string);
  const { mutate: createSlide } = useSlideCreate();

  const [slides, setSlides] = useState<SlideWithQuestionAndElements[]>(null);

  useEffect(() => {
    if (isSuccess) {
      setSlides(quiz.slides);
    }
  }, [isSuccess]);

  const handleClick = (selectedSlideId: string) => {
    router.push(`/quiz/${quizId}/${selectedSlideId}`, undefined, {
      shallow: true,
    });
  };

  const handleCreateSlide = () => {
    createSlide(
      {
        quizId: quizId as string,
        ordinal: slides.length + 1,
      },
      {
        onSuccess: (slide) => {
          setSlides([...slides, slide]);
          router.push(`/quiz/${quizId}/${slide.id}`, undefined, {
            shallow: true,
          });
        },
      }
    );
  };

  return (
    <Navbar.Section grow className={classes.wrapper}>
      <Stack
        spacing={4}
        sx={() => ({ height: '100%', flex: 1 })}
        justify="space-between"
      >
        <Box
          sx={() => ({ height: '100%', flex: 1 })}
          component={ThinScrollArea}
        >
          {slides && (
            <Reorder.Group
              axis="y"
              values={slides}
              onReorder={setSlides}
              style={{ padding: 0 }}
            >
              {slides.map((slide) => (
                <Reorder.Item
                  key={slide.id}
                  value={slide}
                  style={{ listStyle: 'none' }}
                >
                  <SlidePreview
                    slide={slide}
                    slideId={slideId as string}
                    onSlideClick={handleClick}
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
        </Box>
        <Group p="xs">
          <Button
            size="md"
            sx={() => ({ flex: 1 })}
            onClick={handleCreateSlide}
            leftIcon={<Plus weight="duotone" />}
          >
            Add Question
          </Button>
        </Group>
      </Stack>
    </Navbar.Section>
  );
};

const useStyles = createStyles((theme) => ({
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
    height: '100%',
  },
}));
