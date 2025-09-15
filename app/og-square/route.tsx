import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb',
          backgroundImage:
            'linear-gradient(45deg, #f3f4f6 25%, transparent 25%), linear-gradient(-45deg, #f3f4f6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f3f4f6 75%), linear-gradient(-45deg, transparent 75%, #f3f4f6 75%)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: '30px',
            padding: '80px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            maxWidth: '900px',
            margin: '0 40px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '160px',
              height: '160px',
              borderRadius: '80px',
              backgroundColor: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
              fontSize: '64px',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            EK
          </div>

          <h1
            style={{
              fontSize: '42px',
              fontWeight: 'bold',
              color: '#111827',
              margin: '0 0 20px 0',
              lineHeight: '1.1',
              textAlign: 'center',
            }}
          >
            Emirhan Kemal Kosem
          </h1>

          <p
            style={{
              fontSize: '28px',
              color: '#6b7280',
              margin: '0 0 40px 0',
              fontWeight: '500',
            }}
          >
            Frontend Software Engineer
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            {['React', 'Next.js', 'TypeScript', 'GraphQL'].map(tech => (
              <div
                key={tech}
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  fontSize: '18px',
                  fontWeight: '600',
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: '20px',
              color: '#6b7280',
              textAlign: 'center',
              maxWidth: '600px',
              lineHeight: '1.4',
              margin: '0',
            }}
          >
            8+ years experience • Berlin • Accessibility & Modern Web Standards
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 1200,
    }
  );
}
