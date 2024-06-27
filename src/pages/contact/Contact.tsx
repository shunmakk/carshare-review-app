import { Button, Container, FormLabel, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { FormControl, FormHelperText,TextField } from '@mui/material';
import  { useState } from 'react';
import { useForm,SubmitHandler } from 'react-hook-form';
import { init, send } from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Contact.scss'
import Footer from '../../components/Footer';

const FormField = styled(FormControl)({
  width: '100%',
  marginBottom: '1.5rem',
});

const TextArea = styled(TextField)({
  width: '100%',
});

type FormValues = {
  name: string;
  email: string;
  title: string;
  content: string;
};

const schema : yup.ObjectSchema<FormValues> = yup.object({
  name: yup.string().required('名前を入力してください').min(2, '1文字以上で入力してください').max(15, '15文字以下で入力してください'),
  email: yup.string().required('メールアドレスを入力してください').email('メールアドレスの形式ではありません'),
  title: yup.string().required(),
  content: yup.string().required('1文字以上で入力してください'),
});

type FormData = yup.InferType<typeof schema>;

const Contact = () => {
  const [isSending, setIsSending] = useState(false);
  const { handleSubmit, control, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      title: '',
      content: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const userId = process.env.REACT_APP_USER_ID;
    const serviceId = process.env.REACT_APP_SERVICE_ID;
    const templateId = process.env.REACT_APP_TEMPLATE_ID;
  
    const { name, email,title, content } = data;
  
    if (userId && serviceId && templateId) {
      setIsSending(true);
      const loadingToast = toast.loading('送信中');
  
      init(userId);
  
      const params = {
        name: name,
        email: email,
        title: title,
        content: content,
        from: 'カーシェアレビューアップ',
      };
  
      try {
        const result = await send(serviceId, templateId, params);
        if (result.status === 200) {
          toast.success('送信に成功しました🚗');
        } else {
          toast.error('送信に失敗しました😢');
        }
      } catch {
        toast.error('送信に失敗しました。');
      } finally {
        reset();
        toast.dismiss(loadingToast);
        setIsSending(false);
      }
    } else{
      window.alert('e-mail.jsのエラーが発生!')
    }
  };
  return (
    <>
    <Container maxWidth="md" sx={{ overflowY: 'scroll',  paddingTop: '50px', paddingBottom: '30px'
    }}>
      <Toaster />
      <div style={{ backgroundColor: 'white', padding: '50px', borderRadius: '30px', boxShadow: '0px 0px 18px -5px #777777' }}>
        <Typography variant="h4" component="h2" sx={{ mb: 5 ,textAlign: 'center'}}>
          お問い合わせフォーム
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <FormField  >
            <FormLabel htmlFor="name">名前</FormLabel>
            <TextField id="name" placeholder="山田太郎"  {...control.register('name')} disabled={isSending}  />
            <FormHelperText>名前を入力してください</FormHelperText>
          </FormField>
          <FormField>
            <FormLabel  htmlFor="email">メールアドレス</FormLabel>
            <TextField
              id="email"
              placeholder="exaple@yahoo.co.jp"
              type="email"
              {...control.register('email')}
              disabled={isSending}
            />
            <FormHelperText>メールアドレスを入力してください</FormHelperText>
          </FormField>
          <FormField>
            <FormLabel  htmlFor="title">件名</FormLabel>
            <TextField
              id="title"
              placeholder="件名を入力"
              {...control.register('title')}
              disabled={isSending}
            />
            <FormHelperText>件名を入力してください</FormHelperText>
          </FormField>
          <FormField>
            <FormLabel  htmlFor="content">本文</FormLabel >
            <TextArea
              id="content"
              placeholder="お問い合わせ内容について入力"
              multiline
              minRows={4}
              {...control.register('content')}
              disabled={isSending}
            />
            <FormHelperText>お問い合わせ内容を入力してください</FormHelperText>
          </FormField>
          <Button variant="contained" sx={{width: '70%', marginRight: 'auto', marginLeft: 'auto'}} type="submit" disabled={isSending}>
            送信
          </Button>
        </form>
      </div>
    </Container>
    <Footer/>
    </>
 

  );
};

export default Contact;
